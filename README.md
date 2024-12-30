# AI Powered Sentiment Analysis 

A full-stack web application that performs sentiment analysis on CSV data, featuring an interactive dashboard with real-time visualizations.

## Features

- 📊 Real-time sentiment analysis of CSV data
- 📈 Interactive data visualizations using Recharts
- 😊 Emoji-based sentiment indicators
- 🎨 Modern UI with Tailwind CSS
- 📱 Responsive design for all devices
- ⚡ Fast processing with FastAPI backend

## Live Demo

Backend: [https://ai-powered-sentiment-analysis-gemm.onrender.com](https://ai-powered-sentiment-analysis-gemm.onrender.com)
Frontend: https://ai-sentiment-analysis-2.onrender.com/

## Tech Stack

### Backend
- FastAPI
- Python
- TextBlob
- Pandas
- Uvicorn

### Frontend
- React
- Recharts
- Tailwind CSS

## Getting Started

### Prerequisites
- Python 3.8 or higher
- Node.js 14 or higher
- npm or yarn

### Backend Setup

1. Clone the repository
```bash
git clone [your-repo-url]
cd [your-repo-name]/backend
```

2. Install dependencies
```bash
pip install -r requirements.txt
```

3. Run the server
```bash
uvicorn main:app --reload
```

The backend will be running at `http://localhost:8000`

### Frontend Setup

1. Navigate to frontend directory
```bash
cd frontend
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm start
```

The frontend will be running at `http://localhost:3000`

## API Documentation

### Analyze Sentiment
```http
POST /analyze
```

#### Request
- Content-Type: `multipart/form-data`
- Body: CSV file with columns `id` and `text`

#### Response
```json
{
    "overall_sentiment": 0.35,
    "sentiment_distribution": {
        "positive": 60,
        "neutral": 30,
        "negative": 10
    },
    "detailed_results": [
        {
            "id": "1",
            "text": "Sample text",
            "sentiment": 0.8,
            "category": "positive"
        }
    ]
}
```

## CSV File Format

Your CSV file should have the following columns:
```csv
id,text
1,"Great product, highly recommended!"
2,"Could be better, but not bad"
3,"Terrible experience, would not buy again"
```

## Deployment

### Backend (Render)
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure build settings:
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### Frontend (Your preferred platform)
1. Build the frontend:
```bash
npm run build
```
2. Deploy the `build` directory to your hosting platform

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- TextBlob for sentiment analysis
- Recharts for beautiful charts
- Tailwind CSS for styling
- FastAPI for the backend framework

## Screenshots

[Add your application screenshots here]

## Contact

Your Name - nishithaanand2004@gmail.com

Project Link: [https://github.com/Nishitha03/AI-Sentiment-Analysis](https://github.com/Nishitha03/AI-Sentiment-Analysis)
