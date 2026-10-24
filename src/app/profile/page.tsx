'use client';
import { FormEvent, useEffect, useState } from 'react'; import { useRouter, useSearchParams } from 'next/navigation';
export default function Profile() {
  const router = useRouter();
  const params = useSearchParams();
  const [f, setF] = useState({ id: '', name: '', phone: '', email: '', address: '' }); const [saved, setSaved] = useState(false);
  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('iphone_user') || 'null');
    if (!u) router.push('/login');
    else setF(u)}, []);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!f.name || !f.phone || !f.email || !f.address) return; localStorage.setItem('iphone_user', JSON.stringify(f));
    const users = JSON.parse(localStorage.getItem('iphone_users') || '[]');
    localStorage.setItem('iphone_users', JSON.stringify(users.map((u: any) => u.id === f.id ? { ...u, ...f } : u)));
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      if (params.get('required')) router.push('/?openCart=1')
    }, 700)
  };
  return <div className="auth-page">
    <form className="auth-modal" onSubmit={submit}><a className="text-link" href="/">← Do‘konga qaytish</a>
      <div className="auth-brand">●</div>
      <span className="eyebrow">Profil</span>
      <h2>Ma’lumotlaringiz.</h2>
      <p>{params.get('required') ? 'Buyurtma berishdan oldin profilni to‘liq to‘ldiring.' : 'Profilingizni boshqaring.'}</p>
      <div className="auth-form">
        <label>Ism<input value={f.name} onChange={e => setF({ ...f, name: e.target.value })} />
        </label>
        <label>Telefon<input value={f.phone} onChange={e => setF({ ...f, phone: e.target.value })} />
        </label>
        <label>Email<input type="email" value={f.email} onChange={e => setF({ ...f, email: e.target.value })} />
        </label>
        <label>Manzil<input value={f.address} onChange={e => setF({ ...f, address: e.target.value })} placeholder="Shahar, ko‘cha, uy..." />
        </label>{(!f.address || !f.phone) && <div className="auth-error">Buyurtma berish uchun barcha ma’lumotlar, ayniqsa manzil, to‘liq bo‘lishi kerak.</div>}
        {saved && <div className="auth-error" style={{ background: '#effdf4', color: '#16733d' }}>Profil saqlandi.</div>}
        <button className="apple-btn dark full" disabled={!f.name || !f.phone || !f.email || !f.address}>Saqlash</button>
      </div>
    </form>
  </div>
}
