import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import * as bcrypt from 'https://deno.land/x/bcrypt/mod.ts'

serve(async (req) => {
  try {
    const { email, senha } = await req.json()

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const { data, error } = await supabase
      .from('affiliates')
      .select('id, senha_hash')
      .eq('email', email)
      .single()

    if (error || !data) {
      return new Response(
        JSON.stringify({ error: 'Usuário não encontrado' }),
        { status: 401 }
      )
    }

    const senhaCorreta = await bcrypt.compare(senha, data.senha_hash)

    if (!senhaCorreta) {
      return new Response(
        JSON.stringify({ error: 'Senha incorreta' }),
        { status: 401 }
      )
    }

    return new Response(
      JSON.stringify({ success: true, id: data.id }),
      { status: 200 }
    )
  } catch (err) {
    console.error('Erro interno na função login-afiliado:', err)
    return new Response(
      JSON.stringify({ error: 'Erro interno no servidor' }),
      { status: 500 }
    )
  }
})