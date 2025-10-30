from fastapi import FastAPI, UploadFile, File, Form
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware
from sklearn.preprocessing import MinMaxScaler
import numpy as np
from fastapi.responses import StreamingResponse
import io
from typing import Optional
from sklearn.model_selection import train_test_split


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload")
async def upload(
    file: UploadFile = File(...),
    drop_nulls: bool = Form(False),
    fill_mean: bool = Form(False),
    encode: bool = Form(False),
    scale: bool = Form(False),
    return_csv: bool = Form(False),
    include_cols: Optional[str] = Form(None),
    exclude_cols: Optional[str] = Form(None),
    train_test_split_enabled: bool = Form(False),
    test_size: float = Form(0.2),
    remove_outliers: bool = Form(False),
    outlier_method: str = Form("IQR"),
    target_column: Optional[str] = Form(None)
):
    df = pd.read_csv(file.file)

    # Parse column filters
    include_cols = include_cols.split(',') if include_cols else df.columns.tolist()
    exclude_cols_user = exclude_cols.split(',') if exclude_cols else []

    exclude_cols_system = [
        'email', 'Email', 'email_id', 'Email_ID',
        'Name', 'name', 'ID', 'id',
        'Date', 'date', 'Timestamp', 'timestamp',
        'Phone', 'phone', 'Address', 'address',
        'City', 'city', 'Country', 'country',
        'Zip', 'zip', 'Latitude', 'latitude',
        'Longitude', 'longitude', 'Price', 'price',
        'Amount', 'amount'
    ]

    target_cols = [col for col in include_cols if col not in exclude_cols_user + exclude_cols_system]

    # Cleaning
    if drop_nulls:
        df = df.dropna()
    elif fill_mean:
        df = df.fillna(df.mean(numeric_only=True))

    # Numeric columns (safe default)
    numeric_cols = df.select_dtypes(include='number').columns.tolist()
    if not numeric_cols:
        print("No numeric columns found in the uploaded dataset.")
        #raise ValueError("No numeric columns found in the uploaded dataset.")

    # Outlier Removal
    if remove_outliers:
        if outlier_method == "IQR":
            for col in numeric_cols:
                Q1 = df[col].quantile(0.25)
                Q3 = df[col].quantile(0.75)
                IQR = Q3 - Q1
                df = df[(df[col] >= Q1 - 1.5 * IQR) & (df[col] <= Q3 + 1.5 * IQR)]
        elif outlier_method == "Z-score":
            for col in numeric_cols:
                mean = df[col].mean()
                std = df[col].std()
                df = df[(np.abs((df[col] - mean) / std) <= 3)]

    # Encoding
    encoding_maps = {}
    if encode:
        object_cols = df.select_dtypes(include='object').columns
        encode_cols = [col for col in object_cols if col in target_cols]
        for col in encode_cols:
            df[col] = df[col].astype('category')
            encoding_maps[col] = dict(enumerate(df[col].cat.categories))
            df[col] = df[col].cat.codes

    # Scaling
    if scale:
        scale_cols = [col for col in numeric_cols if col in target_cols]
        if scale_cols:
            df[scale_cols] = df[scale_cols].replace([np.inf, -np.inf], np.nan).fillna(0)
            scaler = MinMaxScaler()
            df[scale_cols] = scaler.fit_transform(df[scale_cols])

    # Train/Test Split
    train_set = test_set = None
    if train_test_split_enabled and target_column and target_column in df.columns:
        X = df.drop(columns=[target_column])
        y = df[target_column]
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=test_size, random_state=42)
        train_set = pd.concat([X_train, y_train], axis=1)
        test_set = pd.concat([X_test, y_test], axis=1)

    # Return CSV if requested
    if return_csv:
        buffer = io.StringIO()
        df.to_csv(buffer, index=False)
        buffer.seek(0)
        return StreamingResponse(
            buffer,
            media_type="text/csv",
            headers={"Content-Disposition": "attachment; filename=cleaned.csv"}
        )

    # Summary
    summary = {
        "shape": df.shape,
        "columns": df.columns.tolist(),
        "nulls": df.isnull().sum().to_dict(),
        "dtypes": df.dtypes.astype(str).to_dict(),
        "encoding_maps": encoding_maps,
    }

    if train_set is not None and test_set is not None:
        summary["train_shape"] = train_set.shape
        summary["test_shape"] = test_set.shape

    return summary