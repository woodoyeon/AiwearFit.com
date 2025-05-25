// ✅ 1. AdminDashboard.jsx 수정본
import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAndRole = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return setUser(null);

      const { data: logs } = await supabase
        .from('chat_logs')
        .select('customer_name, sentiment, created_at')
        .in('sentiment', ['부정', '중립'])
        .order('created_at', { ascending: false })
        .limit(5);
  
      const { data: profile } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single();
  
      if (profile?.role !== 'admin') {
        setUser(null); // 권한 없음 처리
      } else {
        setUser(user);
      }
  
      setLoading(false);
    };
  
    fetchUserAndRole();
  }, []);
  

  if (loading) return null;

  if (!user || user.user_metadata?.role !== 'admin') {
    return <div className="p-8 text-red-500 font-semibold">🚫 관리자 전용 페이지입니다</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">📊 관리자 메인 대시보드</h1>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="border p-4 rounded shadow">
          <h2 className="font-semibold mb-2">최근 승인 요청 (5개)</h2>
          <ul className="text-sm text-gray-600">{[...Array(5)].map((_, i) => <li key={i}>상세페이지 {i + 1}</li>)}</ul>
        </div>
        <div className="border p-4 rounded shadow">
          <h2 className="font-semibold mb-2">최근 대화 분석 요청 (5개)</h2>
          <ul className="text-sm text-gray-600">{[...Array(5)].map((_, i) => <li key={i}>사용자 {i + 1}</li>)}</ul>
        </div>
        <div className="border p-4 rounded shadow">
          <h2 className="font-semibold mb-2">사용자 매출 요약 (5명)</h2>
          <ul className="text-sm text-gray-600">{[...Array(5)].map((_, i) => <li key={i}>사용자{i + 1}: ₩123,000</li>)}</ul>
        </div>
        <div className="border p-4 rounded shadow">
          <h2 className="font-semibold mb-2">기본 통계</h2>
          <p>사용자 수: 123명</p>
          <p>게시글 수: 456개</p>
        </div>
        <ul className="text-sm text-gray-600">
          {logs.map((log, i) => (
            <li key={i}>
              {log.customer_name}님 대화 ({log.sentiment}) - {new Date(log.created_at).toLocaleDateString()}
            </li>
          ))}
        </ul>

        <Link href="/admin/chat-analysis">
          <button className="text-blue-600 hover:underline">전체 보기</button>
        </Link>


      </section>
    </div>
  );
}
