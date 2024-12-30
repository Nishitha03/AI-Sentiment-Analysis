from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from textblob import TextBlob
import pandas as pd
import io
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = FastAPI()

# Configure CORS - very important for frontend to work
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.get("/")
async def root():
    """Test endpoint to verify API is working"""
    return {"message": "API is running"}

@app.post("/analyze")
async def analyze_csv(file: UploadFile = File(...)):
    try:
        logger.info(f"Received file: {file.filename}")
        
        # Read the file content
        contents = await file.read()
        logger.info("File read successfully")
        
        # Parse CSV
        df = pd.read_csv(io.StringIO(contents.decode('utf-8')))
        logger.info(f"CSV parsed with columns: {df.columns.tolist()}")
        
        # Basic sentiment analysis
        results = []
        for _, row in df.iterrows():
            sentiment = TextBlob(str(row['text'])).sentiment.polarity
            result = {
                'id': str(row['id']),
                'text': str(row['text']),
                'sentiment': float(sentiment),
                'category': 'positive' if sentiment > 0 else 'negative' if sentiment < 0 else 'neutral'
            }
            results.append(result)
        
        # Calculate metrics
        sentiment_values = [r['sentiment'] for r in results]
        overall_sentiment = sum(sentiment_values) / len(sentiment_values)
        
        # Prepare response
        response = {
            'overall_sentiment': float(overall_sentiment),
            'sentiment_distribution': {
                'positive': len([r for r in results if r['category'] == 'positive']),
                'neutral': len([r for r in results if r['category'] == 'neutral']),
                'negative': len([r for r in results if r['category'] == 'negative'])
            },
            'detailed_results': results
        }
        
        logger.info("Analysis completed successfully")
        return JSONResponse(content=response)
        
    except Exception as e:
        logger.error(f"Error processing request: {str(e)}")
        return JSONResponse(
            status_code=500,
            content={"error": str(e)}
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)