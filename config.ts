import dotenv from 'dotenv';
import path from 'path';

// 加载 .env 文件
dotenv.config({ path: path.resolve(__dirname, '.env') });

// 测试账号配置
export const testConfig = {
    email: process.env.TEST_EMAIL || '313540137@qq.com',
    password: process.env.TEST_PASSWORD || '123456',
};
