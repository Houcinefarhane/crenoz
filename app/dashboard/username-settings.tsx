"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, Copy, Check } from "lucide-react";
import { Loader2 } from "lucide-react";

interface UsernameSettingsProps {
  user: {
    id: string;
    username?: string | null;
    name?: string | null;
  };
}

export function UsernameSettings({ user }: UsernameSettingsProps) {
  const [username, setUsername] = useState(user.username || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSave = async () => {
    if (!username) {
      setError("Le nom d'utilisateur est requis");
      return;
    }

    if (username.length < 3) {
      setError("Le nom d'utilisateur doit contenir au moins 3 caractères");
      return;
    }

    if (!/^[a-z0-9-]+$/.test(username)) {
      setError(
        "Le nom d'utilisateur ne peut contenir que des lettres minuscules, des chiffres et des tirets"
      );
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/users/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Une erreur est survenue");
        return;
      }

      // Recharger la page pour mettre à jour
      window.location.reload();
    } catch (err) {
      setError("Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  const bookingUrl = user.username
    ? `${window.location.origin}/${user.username}`
    : "";

  const handleCopy = () => {
    if (bookingUrl) {
      navigator.clipboard.writeText(bookingUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold mb-4">Page de réservation publique</h3>

      {!user.username ? (
        <div className="space-y-4">
          <p className="text-gray-600 text-sm">
            Définissez un nom d&apos;utilisateur pour créer votre page de réservation
            publique. Les clients pourront réserver via l&apos;URL :{" "}
            <code className="bg-gray-100 px-2 py-1 rounded">
              {window.location.origin}/[votre-username]
            </code>
          </p>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom d&apos;utilisateur *
            </label>
            <div className="flex gap-2">
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase())}
                placeholder="votre-username"
                className="flex-1"
              />
              <Button
                onClick={handleSave}
                disabled={loading || !username}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enregistrement...
                  </>
                ) : (
                  "Enregistrer"
                )}
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Seuls les lettres minuscules, chiffres et tirets sont autorisés
            </p>
            {error && (
              <div className="mt-2 bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded text-sm">
                {error}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Votre URL de réservation
            </label>
            <div className="flex gap-2">
              <div className="flex-1 flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2">
                <Link className="h-4 w-4 text-gray-400" />
                <code className="text-sm text-gray-900 flex-1">{bookingUrl}</code>
              </div>
              <Button
                onClick={handleCopy}
                variant="outline"
                className="whitespace-nowrap"
              >
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Copié !
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copier
                  </>
                )}
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Partagez cette URL avec vos clients pour qu&apos;ils puissent réserver
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              <strong>💡 Astuce :</strong> Testez votre page en ouvrant{" "}
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-medium"
              >
                {bookingUrl}
              </a>{" "}
              dans un nouvel onglet
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
