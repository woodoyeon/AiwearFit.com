import { supabase } from '../supabaseClient';

export const uploadImageToSupabase = async (imageUrl, fileName, folder) => {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    const filePath = `${folder}/${fileName}`;

    const { error } = await supabase.storage
      .from('detail-images')
      .upload(filePath, blob, {
        contentType: 'image/png',
        upsert: true,
      });

    if (error) throw error;

    const { publicUrl } = supabase.storage
      .from('detail-images')
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (err) {
    console.error('❌ 이미지 업로드 실패:', err.message);
    return null;
  }
};
