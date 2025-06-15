
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Helper to generate a random token (simple, for demo)
function generateToken(length = 32) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  for (let i = 0; i < length; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

export function usePasswordReset() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // 1. Request reset: generate and store reset token
  const requestReset = async (email: string) => {
    setLoading(true);

    // Lookup the user profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id, email")
      .eq("email", email.trim())
      .maybeSingle();

    if (profileError || !profile) {
      toast({
        title: "Email não encontrado",
        description: "Nenhuma conta cadastrada com esse email.",
        variant: "destructive",
      });
      setLoading(false);
      return { success: false, token: null };
    }

    // Generate and store the token with a 30min expiry
    const token = generateToken();
    const expires = new Date(Date.now() + 30 * 60 * 1000).toISOString();

    const { error: insertError } = await supabase
      .from("password_reset_tokens")
      .insert([
        {
          user_id: profile.id,
          email: profile.email,
          token,
          expires_at: expires,
        },
      ]);

    if (insertError) {
      toast({
        title: "Erro ao gerar token",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
      setLoading(false);
      return { success: false, token: null };
    }

    toast({
      title: "Token de recuperação gerado!",
      description:
        "As instruções de redefinição foram geradas. (No futuro, isso chegará por email)",
    });

    setLoading(false);
    return { success: true, token }; // For demo, return the token
  };

  // 2. Validate token (for /reset-password?token=xxx)
  const validateToken = async (token: string) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("password_reset_tokens")
      .select("id, user_id, email, expires_at, used")
      .eq("token", token)
      .maybeSingle();

    setLoading(false);

    if (error || !data) {
      return { valid: false, reason: "Token inválido ou expirado." };
    }
    if (data.used) {
      return { valid: false, reason: "Token já foi utilizado." };
    }
    if (new Date(data.expires_at) < new Date()) {
      return { valid: false, reason: "Token expirado." };
    }
    return { valid: true, user_id: data.user_id, email: data.email, id: data.id };
  };

  // 3. Update password (Supabase Auth) using the user's email and update token as used
  const resetPassword = async ({
    token,
    newPassword,
  }: {
    token: string;
    newPassword: string;
  }) => {
    setLoading(true);

    // Find the token data
    const { data: tokenData, error } = await supabase
      .from("password_reset_tokens")
      .select("id, user_id, email, used, expires_at")
      .eq("token", token)
      .maybeSingle();

    if (error || !tokenData) {
      setLoading(false);
      return { success: false, message: "Token inválido." };
    }
    if (tokenData.used) {
      setLoading(false);
      return { success: false, message: "Esse token já foi utilizado." };
    }
    if (new Date(tokenData.expires_at) < new Date()) {
      setLoading(false);
      return { success: false, message: "Token expirado." };
    }

    // Actually reset the password in Supabase Auth
    // This requires Admin API, which we can't do from client.
    // In real scenario, this would be handled via edge function, but for now, we just mark as used.
    // Show instructional message.
    await supabase
      .from("password_reset_tokens")
      .update({ used: true })
      .eq("id", tokenData.id);

    setLoading(false);

    return {
      success: false,
      message:
        "Redefinição de senha não suportada na demo devido a limitações de frontend. Use o fluxo oficial do Supabase.",
    };
  };

  return {
    requestReset,
    validateToken,
    resetPassword,
    loading,
  };
}
