import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// 환경변수 로딩
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// ✅ 라우터 연결
import generateTextFromImage from './routes/generateTextFromImage.js'; // 필요 시 유지
import leonardoRoute from './routes/leonardoAPI.js'; // 필요 시 유지
import fashnFittingRoute from './routes/fashnFitting.js'; // 필요 시 유지
import chatbotRoute from './routes/chatbot.js';
import chatLogsRoute from './routes/chatLogs.js'; // 선택사항
import chatStatusRoute from './routes/chatStatus.js';
import generateAdviceRoute from './routes/generateAdvice.js';
import adminRoutes from './routes/adminRoutes.js';
import cafe24Routes from './routes/cafe24.js';
import productsRoutes from './routes/products.js';


// ✅ 사용 라우터 등록
app.use('/leonardo', leonardoRoute);
app.use('/generate-text', generateTextFromImage);
app.use('/fashn-fitting', fashnFittingRoute);
app.use('/chatbot', chatbotRoute);
app.use('/chat-logs', chatLogsRoute); // 선택 사항
app.use('/chat-status', chatStatusRoute);
app.use('/generate-advice', generateAdviceRoute);
app.use('/api/admin', adminRoutes); // ✅ /api/admin/approval 등 하위 경로 포함됨
app.use('/api/cafe24', cafe24Routes);
app.use('/api/products', productsRoutes);

// 기본 라우터
app.get('/', (req, res) => {
  res.send('✅ 서버 작동 중입니다.');
});

// 서버 시작
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 서버 실행 중: http://localhost:${PORT}`);
});
