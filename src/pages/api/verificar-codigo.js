export default async function handler(req, res) {
  const { codigo } = req.body;

  const supabaseUrl = 'https://drikipvmwlzlztjwgs cu.supabase.co';
  const apikey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRyaWtpcHZtd2x6bHp0andnc2N1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MzI3ODc2MCwiZXhwIjoyMDY4ODU0NzYwfQ.NENlpUJN9Ylae17gywtKYuPlSKOBQL-p4so5emW09io';

  const { data } = await fetch(`${supabaseUrl}/rest/v1/codigos_verificacao?codigo=eq.${codigo}`, {
    method: 'GET',
    headers: {
      apikey: apikey,
      Authorization: `Bearer ${apikey}`,
      'Content-Type': 'application/json'
    }
  }).then((res) => res.json());

  if (data && data.length > 0) {
    const id = data[0].id;

    // Invalida o código após uso
    await fetch(`${supabaseUrl}/rest/v1/codigos_verificacao?id=eq.${id}`, {
      method: 'PATCH',
      headers: {
        apikey: apikey,
        Authorization: `Bearer ${apikey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal'
      },
      body: JSON.stringify({ valido: false })
    });

    return res.status(200).json({ mensagem: 'Código correto' });
  } else {
    return res.status(401).json({ mensagem: 'Código inválido' });
  }