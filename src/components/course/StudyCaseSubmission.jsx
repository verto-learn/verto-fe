import { useState, useEffect } from "react";
import { Github, CheckCircle, XCircle, Loader2, Trophy, MessageSquare, AlertTriangle } from "lucide-react";
import { useSubmitStudyCase } from "../../hooks/course/useSubmitStudyCase";

export const StudyCaseSubmission = ({ chapterId, existingProof }) => {
  const [url, setUrl] = useState("");
  const [notes, setNotes] = useState("");
  const { mutate, isPending } = useSubmitStudyCase();

  // Load data lama ke form agar user mudah edit
  useEffect(() => {
    if (existingProof) {
      setUrl(existingProof.proof_url || "");
      setNotes(existingProof.submission_note || "");
    }
  }, [existingProof]);

  // === LOGIKA STATUS ===
  const isSubmitted = !!existingProof; 
  
  const isGrading = isSubmitted && !existingProof.ai_feedback; 
  
  const hasResult = isSubmitted && !!existingProof.ai_feedback;
  
  const isApproved = existingProof?.approved === true;

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ chapterId, proof_url: url, notes });
  };

  // if (isGrading) {
  //   return (
  //     <div className="mt-8 p-8 bg-gray-900 border border-gray-800 rounded-2xl shadow-xl flex flex-col items-center justify-center text-center animate-pulse">
  //       <Loader2 className="animate-spin text-indigo-400 mb-4" size={48} />
  //       <h4 className="text-xl font-bold text-indigo-300">AI Sedang Memeriksa...</h4>
  //       <p className="text-indigo-400/70 mt-2 max-w-md">
  //         Sistem sedang membaca repositori GitHub, mengecek kode, dan memberikan nilai.
  //         Halaman ini akan update otomatis.
  //       </p>
  //     </div>
  //   );
  // }


  if (isApproved) {
    return (
      <div className="mt-8 p-6 bg-green-900/10 border border-green-500/30 rounded-2xl shadow-xl">
        <div className="flex items-center gap-3 border-b border-green-500/20 pb-4 mb-6">
          <CheckCircle className="text-green-400 w-8 h-8" />
          <div>
            <h3 className="text-xl font-bold text-green-400">Selamat! Tugas Lulus</h3>
            <p className="text-green-300/70 text-sm">Anda telah menyelesaikan studi kasus ini.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center justify-center p-6 bg-gray-800/50 rounded-xl border border-green-500/20">
            <span className="text-gray-400 text-xs uppercase tracking-wider font-semibold mb-2 flex items-center gap-1">
              <Trophy size={14} className="text-yellow-500" /> Skor Akhir
            </span>
            <span className="text-6xl font-black text-white">{existingProof.ai_score}</span>
            <span className="text-gray-500 text-sm mt-1">/ 100</span>
          </div>
          <div className="md:col-span-2 flex flex-col justify-center p-6 bg-gray-800/50 rounded-xl border border-gray-700">
            <span className="text-gray-400 text-xs uppercase tracking-wider font-semibold mb-3 flex items-center gap-1">
              <MessageSquare size={14} className="text-blue-400" /> Feedback AI
            </span>
            <p className="text-gray-200 italic leading-relaxed text-lg">
              "{existingProof.ai_feedback}"
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 3. TAMPILAN BELUM LULUS / BARU MULAI (FORM MUNCUL)
  return (
    <div className="mt-8 p-6 bg-gray-900 border border-gray-800 rounded-2xl shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Github className="text-white" />
          {hasResult ? "Revisi Tugas" : "Submission Studi Kasus"}
        </h3>
      </div>

      {/* === BLOK FEEDBACK ERROR (PENTING: MUNCUL DISINI) === */}
      {/* Ini akan menampilkan pesan AI kenapa nilainya 0 atau gagal */}
      {hasResult && !isApproved && (
        <div className="mb-8 overflow-hidden rounded-xl border border-red-500/30 bg-red-900/10 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="p-4 flex items-center gap-3 border-b border-red-500/20 bg-red-500/10">
            <AlertTriangle className="text-red-400" size={24} />
            <div>
              <h4 className="text-lg font-bold text-red-400">Perlu Revisi</h4>
              <p className="text-red-300/70 text-xs">Skor Anda belum memenuhi syarat kelulusan.</p>
            </div>
          </div>
          
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="flex flex-col items-center justify-center p-4 bg-gray-800/50 rounded-xl border border-red-500/20">
              <span className="text-gray-400 text-xs uppercase font-semibold mb-1">Skor Saat Ini</span>
              <span className="text-5xl font-black text-red-400">{existingProof.ai_score}</span>
            </div>
            
            <div className="md:col-span-2 p-5 bg-gray-800/50 rounded-xl border border-gray-700 relative">
               <span className="text-gray-400 text-xs uppercase font-semibold mb-2 block  items-center gap-2">
                 <MessageSquare size={14}/> Evaluasi AI
               </span>
               {/* MENAMPILKAN PESAN AI DISINI */}
              <p className="text-gray-200 italic text-base leading-relaxed border-l-2 border-red-500 pl-4 py-1">
                "{existingProof.ai_feedback}"
              </p>
            </div>
          </div>
        </div>
      )}

      {/* FORM REVISI */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Link Repository GitHub (Public)
          </label>
          <input
            type="url"
            required
            placeholder="https://github.com/username/repo/blob/main/index.js"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={isPending}
            className={`w-full bg-gray-800 border rounded-xl px-4 py-3 text-white focus:outline-none transition-all ${
                hasResult && !isApproved 
                ? "border-red-500/50 focus:ring-2 focus:ring-red-500" 
                : "border-gray-700 focus:ring-2 focus:ring-indigo-500"
            }`}
          />
          {hasResult && !isApproved && (
             <p className="text-xs text-red-400 mt-2 ml-1">
               *Pastikan link mengarah ke file kode utama (Raw/Blob), bukan folder root.
             </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Catatan Revisi
          </label>
          <textarea
            placeholder="Jelaskan perbaikan yang Anda lakukan..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            disabled={isPending}
            rows={2}
            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              <span>Mengirim Revisi...</span>
            </>
          ) : (
            hasResult ? "Kirim Revisi & Nilai Ulang" : "Kirim Tugas"
          )}
        </button>
      </form>
    </div>
  );
};