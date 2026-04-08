export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false });
  }

  const token = req.body['smart-token'];
  const secret = 'ВАШ_СЕКРЕТНЫЙ_КЛЮЧ_YANDEX';

  if (!token) {
    return res.status(400).json({ success: false, message: 'Нет токена' });
  }

  try {
    const response = await fetch('https://smartcaptcha.yandexcloud.net/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, secret })
    });

    const result = await response.json();

    if (result.status === 'ok') {
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ success: false });
    }

  } catch (error) {
    return res.status(500).json({ success: false });
  }
}
