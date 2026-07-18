/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import favLogo from "./assets/images/fav.webp";
import brandLogo from "./assets/images/white-logo-scaled.webp";
import { createClient } from '@supabase/supabase-js';
import { FaWhatsapp } from "react-icons/fa";
import { 
  Camera, 
  Calendar, 
  MapPin, 
  Mail, 
  Phone, 
  Instagram, 
  Star, 
  X, 
  Menu, 
  ArrowUpRight, 
  GraduationCap, 
  Award, 
  Users, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Sliders, 
  Play, 
  Send, 
  ChevronRight, 
  Eye,
  Settings,
  Heart,
  Package,
  Layers,
  MapPin as MapPinIcon,
  MessageSquare,
  Video,
  Compass,
  Share2,
  Target,
  Plane,
  ChevronDown,
  Folder,
  Facebook,
  Youtube
} from 'lucide-react';

// === KONFIGURASI SUPABASE ===
// Diintegrasikan menggunakan Supabase JavaScript SDK secara langsung
const SUPABASE_URL = 'https://ufdvplffgikgzhzslspg.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_16WWvNmTFeYBr6SEW7sIWg_LEqMflJh';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// @ts-ignore
import productImg from './assets/images/zifa_product_1783848001486.jpg';
// @ts-ignore
import weddingImg from './assets/images/ZifaProfil.webp';
// @ts-ignore
import preweddingImg from './assets/images/zifa_prewedding_1783847973109.jpg';
// @ts-ignore
import graduationImg from './assets/images/zifa_graduation_1783847984443.jpg';

const joggingImg = "https://images.unsplash.com/photo-1502224562085-639556652f33?auto=format&fit=crop&q=80&w=1200";


export default function App() {
  // Navigation states
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Interactivity states
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [selectedPhotoTitle, setSelectedPhotoTitle] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showMoreLinks, setShowMoreLinks] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  // Loading screen states
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaderVisible, setIsLoaderVisible] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStatus, setLoadingStatus] = useState('Menginisialisasi lensa...');

  const isManualScrolling = useRef(false);
  const scrollTimeoutRef = useRef<number | null>(null);

  // Initial loading screen progress simulation
  useEffect(() => {
    let progress = 0;
    const statusMessages = [
      'Menyiapkan elemen visual...',
      'Membuka apertur kamera...',
      'Mengatur fokus lensa...',
      'Memuat galeri karya seni...',
      'Zifa Photography siap!'
    ];

    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 8) + 4; // increment by 4 to 11%
      if (progress >= 100) {
        progress = 100;
        setLoadingStatus(statusMessages[4]);
        setLoadingProgress(100);
        clearInterval(interval);
        
        // Trigger fade out
        setTimeout(() => {
          setIsLoading(false);
          // Completely unmount after transition completes (800ms)
          setTimeout(() => {
            setIsLoaderVisible(false);
          }, 800);
        }, 600);
      } else {
        setLoadingProgress(progress);
        // Map progress to status messages
        if (progress < 25) {
          setLoadingStatus(statusMessages[0]);
        } else if (progress < 50) {
          setLoadingStatus(statusMessages[1]);
        } else if (progress < 75) {
          setLoadingStatus(statusMessages[2]);
        } else {
          setLoadingStatus(statusMessages[3]);
        }
      }
    }, 70);

    return () => clearInterval(interval);
  }, []);

  // Lock body scroll during initial loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  // Track scroll position & active section
  useEffect(() => {
    const handleScroll = () => {
      // 1. Sticky header background trigger
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // 2. Active Section detection
      const sections = ['home', 'about', 'portfolio', 'experience', 'testimonials', 'faq', 'contact'];
      const scrollPosition = window.scrollY;
      const navbarHeight = 90; // Adjust for the navbar height
      
      let currentSection = 'home';
      
      // If we are at the very bottom of the page, force 'contact' to be active
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
        currentSection = 'contact';
      } else {
        for (const sectionId of sections) {
          const el = document.getElementById(sectionId);
          if (el) {
            const rect = el.getBoundingClientRect();
            // el.getBoundingClientRect().top + window.scrollY gets absolute top position from document start
            const sectionTop = rect.top + scrollPosition - navbarHeight - 120; // adding generous buffer
            if (scrollPosition >= sectionTop) {
              currentSection = sectionId;
            }
          }
        }
      }

      if (!isManualScrolling.current) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger on mount
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Smooth scroll handler with offset for the fixed navbar
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      setMobileMenuOpen(false); // Close mobile drawer if active
      setActiveSection(targetId); // Set active state instantly for clicked link
      
      isManualScrolling.current = true;
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }

      const offset = 80; // Navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = targetEl.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Release manual scroll lock once smooth scroll is completed (~800ms)
      scrollTimeoutRef.current = window.setTimeout(() => {
        isManualScrolling.current = false;
      }, 800) as unknown as number;
    }
  };

  // Handle FAQ item click
  const toggleFaq = (index: number) => {
    if (activeFaq === index) {
      setActiveFaq(null);
    } else {
      setActiveFaq(index);
    }
  };

  // Open photo in lightbox
  const openLightbox = (imgSrc: string, title: string) => {
    setSelectedPhoto(imgSrc);
    setSelectedPhotoTitle(title);
  };

  // Handle contact form submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;
    
    // Simulate API request/submission status
    setFormSubmitted(true);
    
    // Construct WhatsApp message and redirect
    const messageText = `Halo Zifa Photography, nama saya ${formData.name.trim()}. ${formData.message.trim()}`;
    const cleanPhone = contactInfo.no_whatsapp.replace(/[^0-9]/g, '');
    const waPhone = cleanPhone.startsWith('0') ? '62' + cleanPhone.substring(1) : cleanPhone;
    const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(messageText)}`;
    
    window.open(waUrl, '_blank');
    
    // Reset form
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  // Interactive Hero photo deck state
  const [deckCards, setDeckCards] = useState([
    {
      id: 'prewedding',
      image: preweddingImg,
      category: 'Prewedding',
      title: 'Scenic Bali',
      meta: '50mm • f/1.8 • ISO 100',
      fullTitle: 'Scenic Prewedding - Bali'
    },
    {
      id: 'wedding',
      image: weddingImg,
      category: 'Wedding',
      title: 'Raka & Salsa',
      meta: '85mm • f/1.4 • ISO 200',
      fullTitle: 'Wedding Documentation - Raka & Salsa'
    },
    {
      id: 'graduation',
      image: graduationImg,
      category: 'Graduation',
      title: 'Universitas ABC',
      meta: '135mm • f/2.0 • ISO 100',
      fullTitle: 'Graduation Portrait - Universitas ABC'
    }
  ]);

  const handleDeckCardClick = (clickedIndex: number) => {
    if (clickedIndex !== 1) {
      // Swap clicked index with center index (1)
      const updatedDeck = [...deckCards];
      const temp = updatedDeck[1];
      updatedDeck[1] = updatedDeck[clickedIndex];
      updatedDeck[clickedIndex] = temp;
      setDeckCards(updatedDeck);
    }
  };

  // List of extra Google Drive album links shown when clicking "Lihat Album Lainnya"
  const [extraAlbums, setExtraAlbums] = useState([
    {
      title: "Wedding Rezky & Dina",
      category: "Wedding Documentation",
      link: "https://drive.google.com/drive/folders/placeholder_extra_wedding_rezky"
    },
    {
      title: "Prewedding Aris & Vina",
      category: "Scenic Prewedding",
      link: "https://drive.google.com/drive/folders/placeholder_extra_prewed_aris"
    },
    {
      title: "Wisuda Universitas Mataram",
      category: "Graduation Portrait",
      link: "https://drive.google.com/drive/folders/placeholder_extra_wisuda_unram"
    },
    {
      title: "Catalog Fashion Autumn",
      category: "Commercial Product",
      link: "https://drive.google.com/drive/folders/placeholder_extra_fashion_autumn"
    },
    {
      title: "Intimate Engagement Dian & Bayu",
      category: "Wedding & Engagement",
      link: "https://drive.google.com/drive/folders/placeholder_extra_engagement_dian"
    },
    {
      title: "Portrait Studio Solo Amanda",
      category: "Personal Portraiture",
      link: "https://drive.google.com/drive/folders/placeholder_extra_portrait_amanda"
    },
    {
      title: "Family Gathering Pertamina",
      category: "Corporate & Event",
      link: "https://drive.google.com/drive/folders/placeholder_extra_event_pertamina"
    },
    {
      title: "Sesi Maternity Rani & Adit",
      category: "Family & Maternity",
      link: "https://drive.google.com/drive/folders/placeholder_extra_maternity_rani"
    }
  ]);

  // List of Albums for Pratinjau Foto section
  const [albums, setAlbums] = useState([
    {
      id: 1,
      title: "Ayani Loop",
      category: "Sports & Event",
      image: "https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?auto=format&fit=crop&q=80&w=1000",
      link: "https://drive.google.com/drive/folders/placeholder_ayaniloop",
      gridClass: "col-6"
    },
    {
      id: 2,
      title: "Wedding Raka & Salsa",
      category: "Wedding Documentation",
      image: weddingImg,
      link: "https://drive.google.com/drive/folders/placeholder_wed_raka_salsa",
      gridClass: "col-6"
    },
    {
      id: 3,
      title: "Wisuda Universitas ABC",
      category: "Graduation Portrait",
      image: graduationImg,
      link: "https://drive.google.com/drive/folders/placeholder_wisuda_abc",
      gridClass: "col-4"
    },
    {
      id: 4,
      title: "Product Coffee",
      category: "Commercial Product",
      image: productImg,
      link: "https://drive.google.com/drive/folders/placeholder_product_coffee",
      gridClass: "col-4"
    },
    {
      id: 5,
      title: "Prewedding Bali",
      category: "Scenic Prewedding",
      image: preweddingImg,
      link: "https://drive.google.com/drive/folders/placeholder_prewed_bali",
      gridClass: "col-4"
    },
    {
      id: 6,
      title: "Family Session",
      category: "Family Portraiture",
      image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=1000",
      link: "https://drive.google.com/drive/folders/placeholder_family_session",
      gridClass: "col-8"
    },
    {
      id: 7,
      title: "Event Festival",
      category: "Culture & Music Festival",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1000",
      link: "https://drive.google.com/drive/folders/placeholder_event_festival",
      gridClass: "col-4"
    }
  ]);

  // List of FAQs
  const [faqs, setFaqs] = useState([
    {
      question: "Bagaimana cara melakukan booking sesi foto di Zifa Photography?",
      answer: "Anda dapat melakukan booking dengan mengklik tombol 'Pesan Sekarang' yang langsung mengarah ke WhatsApp kami di 087864802104. Sampaikan tanggal, konsep acara, dan jenis sesi fotografi yang Anda butuhkan."
    },
    {
      question: "Berapa lama proses pengerjaan dan pengiriman hasil foto?",
      answer: "Untuk sesi Portrait/Wisuda/Produk biasanya memakan waktu 3-5 hari kerja. Untuk Wedding & Prewedding berskala besar membutuhkan waktu 10-14 hari kerja untuk proses sortir serta retouching profesional sebelum dikirim via Google Drive."
    },
    {
      question: "Apakah klien mendapatkan seluruh file foto mentah (RAW)?",
      answer: "Kami mengirimkan seluruh file beresolusi tinggi hasil kurasi terbaik yang sudah melewati proses color correction dasar, serta sejumlah file pilihan khusus yang melalui retouching detail premium."
    },
    {
      question: "Di mana lokasi studio Zifa Photography? Apakah melayani luar kota?",
      answer: "Lokasi studio kami tercantum pada peta di bawah ini. Kami juga sangat terbuka untuk sesi pemotretan outdoor maupun destinasi di luar kota/provinsi dengan penyesuaian biaya akomodasi."
    },
    {
      question: "Bagaimana sistem pembayaran untuk booking jadwal?",
      answer: "Booking jadwal dinyatakan sah setelah pembayaran Down Payment (DP) sebesar 30%. Sisa pelunasan dapat dilakukan pada hari H pemotretan atau maksimal H+1 sesi pemotretan selesai."
    }
  ]);

  // List of timeline milestones
  const [milestones, setMilestones] = useState([
    { year: "2023", title: "Juara Harapan Lomba Fotografi Kabupaten", desc: "Penghargaan karya visual bertema kearifan lokal yang menandai awal pengakuan publik profesional.", url: "" },
    { year: "2024", title: "Official Photographer Festival Budaya", desc: "Dipercaya mendokumentasikan festival tahunan daerah berskala besar dengan lebih dari 10.000 pengunjung.", url: "" },
    { year: "2025", title: "Juara 2 LKS Photography Tingkat Provinsi", desc: "Berkompetisi menguji kecepatan, kecakapan, serta estetika visual di bidang fotografi komersial.", url: "" },
    { year: "2026", title: "Official Photographer Wedding Expo", desc: "Mendominasi pameran pernikahan regional sebagai penyedia jasa dokumentasi premium terpercaya.", url: "" },
    { year: "2027", title: "Mendokumentasikan >500 Sesi Pemotretan", desc: "Pencapaian portofolio solid yang mencakup ribuan memori pernikahan, portrait wisuda, dan produk komersial." , url: ""},
    { year: "2028", title: "Dipercaya oleh Lebih dari 100 Klien Korporat", desc: "Memperluas jangkauan kerja sama dengan brand-brand lokal ternama untuk konten periklanan dan katalog." , url: ""},
    { year: "2029", title: "Juara 1 LKS Photography Nasional", desc: "Penghargaan kasta tertinggi nasional, memvalidasi teknik, detail, dan keunggulan artistik Zifa Photography.", url: "" }
  ]);

  // List of testimonials
  const [testimonials, setTestimonials] = useState([
    {
      name: "Raka Prasetya",
      role: "Wedding Client",
      initials: "RP",
      rating: 5,
      comment: "Hasil fotonya luar biasa banget! Setiap momen emosional pas nikahan ke-capture sempurna. Ton warna yang dikasih estetik parah, pengerjaannya juga cepat lewat Google Drive."
    },
    {
      name: "Salsa Kirana",
      role: "Prewedding Client",
      initials: "SK",
      rating: 5,
      comment: "Zifa Photography bener-bener ramah pas nuntun pose pas sesi Prewed Bali kemarin. Kita berdua yang kaku jadi bisa keliatan natural dan romantis banget di foto. Highly recommended!"
    },
    {
      name: "Universitas ABC Graduate",
      role: "Graduation Client",
      initials: "UG",
      rating: 5,
      comment: "Studio rapi, lightingnya professional sekali, dan fotografernya sabar banget buat dapet angle terbaik pas wisuda kemarin. Hasilnya tajam dan premium buat dicetak pajangan keluarga."
    }
  ]);

  // List of services (layanan_kami)
  const [services, setServices] = useState([
    "Wedding Documentation",
    "Prewedding Outdoor",
    "Graduation & Wisuda",
    "Product & Commercial",
    "Event Documentation"
  ]);

  // Contact Info (informasi_kontak)
  const [contactInfo, setContactInfo] = useState({
    no_whatsapp: "087864802104",
    email: "info@zifaphotography.com",
    alamat: "Jl. Raya Utama No. 42, Kota Mojokerto, Jawa Timur",
    maps_embed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.5134110375833!2d112.74836481155986!3d-7.296068292683057!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fba7ebc9735d%3A0xe5a363717df3d7e6!2sSurabaya%20Town%20Square!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid",
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    tiktok: "https://tiktok.com",
    youtube: "https://youtube.com"
  });

  // Fetch all tables dynamically from Supabase
  useEffect(() => {
    // A. Fetch foto_beranda
    async function getHeroPhotos() {
      try {
        const { data, error } = await supabase
          .from('foto_beranda')
          .select('*')
          .order('id', { ascending: true });
        
        if (data && data.length > 0) {
          const mapped = data.map((item, idx) => {
            let category = 'Photography';
            let meta = 'Original Lens';
            let fullTitle = item.judul;
            
            if (item.alt && item.alt.includes('|')) {
              const parts = item.alt.split('|');
              category = parts[0] || category;
              meta = parts[1] || meta;
              fullTitle = parts[2] || fullTitle;
            }
            
            let image = item.gambar;
            if (image === '/src/assets/images/zifa_prewedding_1783847973109.jpg') image = preweddingImg;
            else if (image === '/src/assets/images/zifa_wedding_1783847960105.jpg') image = weddingImg;
            else if (image === '/src/assets/images/zifa_graduation_1783847984443.jpg') image = graduationImg;
            
            return {
              id: item.id ? String(item.id) : (idx === 0 ? 'prewedding' : idx === 1 ? 'wedding' : 'graduation'),
              image: image,
              category: category,
              title: item.judul,
              meta: meta,
              fullTitle: fullTitle
            };
          });
          setDeckCards(mapped);
        }
      } catch (e) {
        console.error('Error fetching foto_beranda:', e);
      }
    }

    // B. Fetch preview_foto
    async function getAlbums() {
      try {
        const { data, error } = await supabase
          .from('preview_foto')
          .select('*')
          .order('id', { ascending: true });
        
        if (data && data.length > 0) {
          const mainAlbumsData = data.slice(0, 6);
          const extraAlbumsData = data.slice(6);

          if (mainAlbumsData.length > 0) {
            const mappedMain = mainAlbumsData.map((item) => {
              let category = 'Portofolio';
              let gridClass = 'col-4';
              let title = item.judul;
              
              if (item.judul && item.judul.includes('|')) {
                const parts = item.judul.split('|');
                title = parts[0];
                category = parts[1] || category;
                gridClass = parts[2] || gridClass;
              }
              
              let image = item.gambar;
              if (image === '/src/assets/images/zifa_wedding_1783847960105.jpg') image = weddingImg;
              else if (image === '/src/assets/images/zifa_graduation_1783847984443.jpg') image = graduationImg;
              else if (image === '/src/assets/images/zifa_product_1783848001486.jpg') image = productImg;
              else if (image === '/src/assets/images/zifa_prewedding_1783847973109.jpg') image = preweddingImg;
              
              return {
                id: item.id,
                title: title,
                category: category,
                image: image || '',
                link: item.link_preview || '',
                gridClass: gridClass
              };
            });
            setAlbums(mappedMain);
          } else {
            setAlbums([]);
          }

          if (extraAlbumsData.length > 0) {
            const mappedExtra = extraAlbumsData.map((item) => {
              let category = 'Portofolio';
              let title = item.judul;
              
              if (item.judul && item.judul.includes('|')) {
                const parts = item.judul.split('|');
                title = parts[0];
                category = parts[1] || category;
              }
              
              return {
                title: title,
                category: category,
                link: item.link_preview || ''
              };
            });
            setExtraAlbums(mappedExtra);
          } else {
            setExtraAlbums([]);
          }
        } else {
          setAlbums([]);
          setExtraAlbums([]);
        }
      } catch (e) {
        console.error('Error fetching preview_foto:', e);
      }
    }

    // C. Fetch pengalaman
    async function getExperience() {
      try {
        const { data, error } = await supabase
          .from('pengalaman')
          .select('*')
          .order('id', { ascending: true });
        
        if (data && data.length > 0) {
          const mapped = data.map((item) => ({
            year: item.tahun || '2026',
            title: item.judul || '',
            desc: item.deskripsi || '',
            url: item.url || ''
          }));
          setMilestones(mapped);
        }
      } catch (e) {
        console.error('Error fetching pengalaman:', e);
      }
    }

    // D. Fetch testimoni
    async function getTestimonials() {
      try {
        const { data, error } = await supabase
          .from('testimoni')
          .select('*')
          .order('id', { ascending: true });
        
        if (data && data.length > 0) {
          const mapped = data.map((item) => {
            let role = item.pekerjaan || '';
            let initials = item.nama ? item.nama.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() : 'SK';
            
            if (item.pekerjaan && item.pekerjaan.includes('|')) {
              const parts = item.pekerjaan.split('|');
              role = parts[0];
              initials = parts[1] || initials;
            }
            
            return {
              name: item.nama || '',
              role: role,
              initials: initials,
              rating: item.rating || 5,
              comment: item.ulasan || ''
            };
          });
          setTestimonials(mapped);
        }
      } catch (e) {
        console.error('Error fetching testimoni:', e);
      }
    }

    // E. Fetch pertanyaan_umum
    async function getFaqs() {
      try {
        const { data, error } = await supabase
          .from('pertanyaan_umum')
          .select('*')
          .order('id', { ascending: true });
        
        if (data && data.length > 0) {
          const mapped = data.map((item) => ({
            question: item.pertanyaan || '',
            answer: item.jawaban || ''
          }));
          setFaqs(mapped);
        }
      } catch (e) {
        console.error('Error fetching pertanyaan_umum:', e);
      }
    }

    // F. Fetch layanan_kami
    async function getServices() {
      try {
        const { data, error } = await supabase
          .from('layanan_kami')
          .select('*')
          .order('id', { ascending: true });
        
        if (data && data.length > 0) {
          const mapped = data.map((item) => item.nama_layanan || '');
          setServices(mapped);
        }
      } catch (e) {
        console.error('Error fetching layanan_kami:', e);
      }
    }

    // G. Fetch informasi_kontak
    async function getContactInfo() {
      try {
        const { data, error } = await supabase
          .from('informasi_kontak')
          .select('*')
          .limit(1);
        
        if (data && data.length > 0) {
          setContactInfo({
            no_whatsapp: data[0].no_whatsapp || "087864802104",
            email: data[0].email || "info@zifaphotography.com",
            alamat: data[0].alamat || "Jl. Raya Utama No. 42, Kota Mojokerto, Jawa Timur",
            maps_embed: data[0].maps_embed || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.5134110375833!2d112.74836481155986!3d-7.296068292683057!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fba7ebc9735d%3A0xe5a363717df3d7e6!2sSurabaya%20Town%20Square!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid",
            instagram: data[0].instagram || "https://instagram.com",
            facebook: data[0].facebook || "https://facebook.com",
            tiktok: data[0].tiktok || "https://tiktok.com",
            youtube: data[0].youtube || "https://youtube.com"
          });
        }
      } catch (e) {
        console.error('Error fetching informasi_kontak:', e);
      }
    }

    getHeroPhotos();
    getAlbums();
    getExperience();
    getTestimonials();
    getFaqs();
    getServices();
    getContactInfo();
  }, []);

  return (
    <div className="app-container" id="home">

      {/* --- INITIAL LOADING SCREEN --- */}
      {isLoaderVisible && (
        <div className={`app-loader ${!isLoading ? 'fade-out' : ''}`}>
          <div className="loader-content">
            <div className="aperture-container">
              <div className="aperture-outer-ring"></div>
              <div className="aperture-glow"></div>
              <img 
                src={favLogo} 
                alt="Zifa Photography Logo" 
                className="loader-logo-img"
                loading="eager"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="loader-progress-wrapper">
              <div 
                className="loader-progress-bar" 
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
            
            <div className="loader-status-container">
              <span className="loader-percentage">{loadingProgress}%</span>
              <span className="loader-status-text">{loadingStatus}</span>
            </div>
          </div>
        </div>
      )}

      {/* --- BACKGROUND DECORATIONS & GLOWS --- */}
      <div className="bg-glow-wrapper">
        <div className="radial-glow glow-1"></div>
        <div className="radial-glow glow-2"></div>
        <div className="radial-glow glow-3"></div>
        <div className="radial-glow glow-4"></div>
        <div className="radial-glow glow-5"></div>

        {/* Animated Floating Bokeh / Glowing Light Particles */}
        <div className="bokeh-container">
          <div className="bokeh-particle bp-1"></div>
          <div className="bokeh-particle bp-2"></div>
          <div className="bokeh-particle bp-3"></div>
          <div className="bokeh-particle bp-4"></div>
          <div className="bokeh-particle bp-5"></div>
          <div className="bokeh-particle bp-6"></div>
          <div className="bokeh-particle bp-7"></div>
          <div className="bokeh-particle bp-8"></div>
          <div className="bokeh-particle bp-9"></div>
          <div className="bokeh-particle bp-10"></div>
        </div>
      </div>

      {/* --- NAVIGATION BAR --- */}
      <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="container">
          <a href="#home" className="nav-brand" id="nav-logo" onClick={(e) => handleScrollTo(e, 'home')}>
            <img 
              src={favLogo} 
              alt="ZIFA PHOTOGRAPHY" 
              className="nav-logo-image"
              referrerPolicy="no-referrer"
    
            />
          </a>

          <ul className="nav-links">
            <li><a href="#home" className={`nav-link ${activeSection === 'home' ? 'active' : ''}`} onClick={(e) => handleScrollTo(e, 'home')}>Beranda</a></li>
            <li><a href="#about" className={`nav-link ${activeSection === 'about' ? 'active' : ''}`} onClick={(e) => handleScrollTo(e, 'about')}>Tentang Kami</a></li>
            <li><a href="#portfolio" className={`nav-link ${activeSection === 'portfolio' ? 'active' : ''}`} onClick={(e) => handleScrollTo(e, 'portfolio')}>Pratinjau Foto</a></li>
            <li><a href="#experience" className={`nav-link ${activeSection === 'experience' ? 'active' : ''}`} onClick={(e) => handleScrollTo(e, 'experience')}>Pengalaman</a></li>
            <li><a href="#testimonials" className={`nav-link ${activeSection === 'testimonials' ? 'active' : ''}`} onClick={(e) => handleScrollTo(e, 'testimonials')}>Testimoni</a></li>
            <li><a href="#faq" className={`nav-link ${activeSection === 'faq' ? 'active' : ''}`} onClick={(e) => handleScrollTo(e, 'faq')}>Pertanyaan Umum</a></li>
            <li><a href="#contact" className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`} onClick={(e) => handleScrollTo(e, 'contact')}>Kontak</a></li>
          </ul>

          <div className="nav-actions">
          </div>

          <button 
            className="mobile-menu-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            id="mobile-menu-btn"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* --- MOBILE DRAWER OVERLAY --- */}
      <div className={`mobile-drawer ${mobileMenuOpen ? 'active' : ''}`} id="mobile-nav-drawer">
        <button 
          className="mobile-drawer-close" 
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close navigation menu"
          id="mobile-drawer-close-btn"
        >
          <X size={28} />
        </button>
        <a href="#home" className={`mobile-drawer-link ${activeSection === 'home' ? 'active' : ''}`} onClick={(e) => handleScrollTo(e, 'home')}>Beranda</a>
        <a href="#about" className={`mobile-drawer-link ${activeSection === 'about' ? 'active' : ''}`} onClick={(e) => handleScrollTo(e, 'about')}>Tentang Kami</a>
        <a href="#portfolio" className={`mobile-drawer-link ${activeSection === 'portfolio' ? 'active' : ''}`} onClick={(e) => handleScrollTo(e, 'portfolio')}>Pratinjau Foto</a>
        <a href="#experience" className={`mobile-drawer-link ${activeSection === 'experience' ? 'active' : ''}`} onClick={(e) => handleScrollTo(e, 'experience')}>Pengalaman</a>
        <a href="#testimonials" className={`mobile-drawer-link ${activeSection === 'testimonials' ? 'active' : ''}`} onClick={(e) => handleScrollTo(e, 'testimonials')}>Testimoni</a>
        <a href="#faq" className={`mobile-drawer-link ${activeSection === 'faq' ? 'active' : ''}`} onClick={(e) => handleScrollTo(e, 'faq')}>Pertanyaan Umum</a>
        <a href="#contact" className={`mobile-drawer-link ${activeSection === 'contact' ? 'active' : ''}`} onClick={(e) => handleScrollTo(e, 'contact')}>Kontak</a>
      </div>

      {/* --- HERO SECTION --- */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            
            <div className="hero-text">
              <div className="badge-pill" id="hero-badge-pill">
                <span className="badge-dot"></span>
                Premium Photography
              </div>
              <h1 className="hero-title" id="hero-heading">
                ZIFA PHOTOGRAPHY
              </h1>
              <p className="hero-desc" id="hero-description">
               Menghadirkan jasa dokumentasi yang berkualitas untuk berbagai acara dan momen spesial Anda. Kami berkomitmen mengabadikan setiap emosi, detail, dan keindahan estetika dengan profesional.
              </p>
              
              <div className="hero-actions">
                <a 
                  href={`https://wa.me/${contactInfo.no_whatsapp.replace(/[^0-9]/g, '').startsWith('0') ? '62' + contactInfo.no_whatsapp.replace(/[^0-9]/g, '').substring(1) : contactInfo.no_whatsapp.replace(/[^0-9]/g, '')}?text=Halo%20Zifa%20Photography`} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="btn-primary"
                  id="hero-cta-whatsapp"
                >
                  Pesan Sekarang <ArrowUpRight size={18} />
                </a>
                <a href="#portfolio" className="btn-secondary" id="hero-secondary-portfolio" onClick={(e) => handleScrollTo(e, 'portfolio')}>
                  Pratinjau Foto
                </a>
              </div>

              {/* Stat elements underneath hero text */}
              <div className="hero-features" id="hero-feature-highlights">
                <div className="hero-feature-item">
                  <span className="hero-feature-icon"><Camera size={16} /></span>
                  <div className="hero-feature-text">
                    Fotografi
                    <p>Dokumentasi foto</p>
                  </div>
                </div>
                <div className="hero-feature-item">
                  <span className="hero-feature-icon"><Video size={16} /></span>
                  <div className="hero-feature-text">
                    Videografi
                    <p>Dokumentasi video</p>
                  </div>
                </div>
                <div className="hero-feature-item">
                  <span className="hero-feature-icon"><Plane size={16} /></span>
                  <div className="hero-feature-text">
                    Rental Drone
                    <p>Footage udara</p>
                  </div>
                </div>
                <div className="hero-feature-item">
                  <span className="hero-feature-icon"><Target size={16} /></span>
                  <div className="hero-feature-text">
                    Branding
                    <p>Identitas visual</p>
                  </div>
                </div>
                <div className="hero-feature-item">
                  <span className="hero-feature-icon"><Instagram size={16} /></span>
                  <div className="hero-feature-text">
                    Konten Medsos
                    <p>Konten media sosial</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Camera workspace editor mockup (fits the master design mockup style perfectly) */}
            <div className="hero-visual" id="hero-interactive-workspace">
              <div className="hero-photos-deck">
                {/* Decorative Viewfinder Corners */}
                <div className="deck-viewfinder">
                  <span className="deck-corner-tr"></span>
                  <span className="deck-corner-bl"></span>
                </div>
                
                {/* Rule of Thirds camera grid lines */}
                <div className="deck-grid-lines"></div>
                
                {/* Central Focus Circle decoration */}
                <div className="deck-focus-circle"></div>

                {/* Dynamic Card Swapping Deck */}
                {deckCards.map((card, idx) => {
                  const cardClass = `deck-card deck-card-${idx + 1}`;
                  return (
                    <div 
                      key={card.id}
                      className={cardClass}
                      onClick={() => handleDeckCardClick(idx)}
                      id={`hero-deck-card-${card.id}`}
                    >
                      <img src={card.image} alt={card.title} referrerPolicy="no-referrer" />
                      <div className="deck-card-glow"></div>
                      <div className="deck-card-caption">
                        <span className="deck-card-tag">{card.category}</span>
                        <h4 className="deck-card-title">
                          {card.title} <span><ArrowUpRight size={14} /></span>
                        </h4>
                        <div className="deck-card-meta">{card.meta}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- TENTANG KAMI SECTION --- */}
      <section className="section section-alt" id="about">
        <div className="container">
          <div className="about-grid">
            
            <div className="about-visual-grid" id="about-visuals">
              <div className="about-img-box about-img-tall">
                <img src={weddingImg} alt="Zifa Photography Profile"  loading="eager" referrerPolicy="no-referrer" />
              </div>
            
            </div>

            <div className="about-text" id="about-content">
              <span className="section-tag">Tentang Kami</span>
              <h2 className="section-title">Dokumentasi Visual Profesional Terbaik</h2>
              <p>
                Zifa Photography adalah vendor yang menyediakan layanan terintegrasi dalam bidang fotografi, videografi, livestreaming, rental drone, dan desain grafis. Kami berdedikasi untuk memenuhi berbagai kebutuhan visual dan multimedia Anda dengan standar kualitas tertinggi dan inovasi yang berkelanjutan.
              </p>
             
              <p>
              Zifa Photography berkomitmen untuk memberikan layanan yang berkualitas tinggi dan solusi kreatif yang disesuaikan dengan kebutuhan masing-masing klien. Dengan pengalaman yang mendalam dan dedikasi terhadap keunggulan, kami memastikan bahwa setiap proyek yang kami tangani dapat melebihi harapan klien kami.
              </p>
              

              <a href="#contact" className="btn-primary" id="about-cta-contact" onClick={(e) => handleScrollTo(e, 'contact')}>Hubungi Kami Sekarang</a>
            </div>

          </div>
        </div>
      </section>

      {/* --- PORTFOLIO PREVIEW (PRATINJAU FOTO - BENTO GRID) --- */}
      <section className="section" id="portfolio">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Pratinjau Foto</span>
            <h2 className="section-title">Arsip Album Digital</h2>
            <p className="section-desc">
              Berikut adalah beberapa berkas album premium dari klien kami. Klik pada tombol album untuk mengarah langsung ke folder penyimpanan aman di Google Drive.
            </p>
          </div>

          <div className="albums-grid" id="portfolio-bento-grid">
            {albums.map((album) => (
              <div 
                key={album.id} 
                className={`album-card glass-card ${album.gridClass}`}
                onClick={() => window.open(album.link, '_blank')}
                id={`album-card-${album.id}`}
              >
                <img 
                  src={album.image} 
                  alt={album.title} 
                  className="album-bg" 
                  referrerPolicy="no-referrer"
                />
                <div className="album-content">
                  <div className="album-info-text">
                    <span className="album-tag">{album.category}</span>
                    <h3 className="album-title">{album.title}</h3>
                  </div>
                  <a 
                    href={album.link} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="album-arrow"
                    title="Buka Album Google Drive"
                    onClick={(e) => e.stopPropagation()}
                    id={`album-link-btn-${album.id}`}
                  >
                    <ArrowUpRight size={18} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Expandable Google Drive Links Section */}
          {extraAlbums.length > 0 && (
            <div className="portfolio-more-container">
              <button
                onClick={() => setShowMoreLinks(!showMoreLinks)}
                className="btn-toggle-more"
                id="btn-toggle-more-albums"
              >
                <span>{showMoreLinks ? 'Sembunyikan Album' : 'Lihat Album Lainnya'}</span>
                <ChevronDown 
                  size={16} 
                  className={`transition-transform duration-300 ${showMoreLinks ? 'rotate-180' : ''}`} 
                />
              </button>

              {showMoreLinks && (
                <div className="extra-albums-wrapper">
                  <div className="extra-albums-grid">
                    {extraAlbums.map((extra, index) => (
                      <a
                        key={index}
                        href={extra.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="extra-album-card"
                        id={`extra-album-link-${index}`}
                      >
                        {/* Top Bar with Icon and Category */}
                        <div className="extra-card-top">
                          <div className="extra-card-icon">
                            <Folder size={20} />
                          </div>
                          {/* Custom Google Drive Badge */}
                          <div className="gdrive-badge">
                            <span className="gdrive-badge-text">Google Drive</span>
                          </div>
                        </div>

                        {/* Content Area */}
                        <div className="extra-card-body">
                          <span className="extra-card-category">
                            {extra.category}
                          </span>
                          <h3 className="extra-card-title">
                            {extra.title}
                          </h3>
                        </div>

                        {/* Bottom Action Hint */}
                        <div className="extra-card-footer">
                          <span>Buka di Google Drive</span>
                          <ArrowUpRight size={14} className="extra-card-arrow" />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* --- EXPERIENCE SECTION (TIMELINE) --- */}
      <section className="section section-alt" id="experience">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Pengalaman</span>
            <h2 className="section-title">Garis Waktu Prestasi & Dedikasi</h2>
            <p className="section-desc">
              Rekam jejak, kompetisi resmi, serta tonggak sejarah profesional yang membangun dedikasi Zifa Photography dari tahun ke tahun.
            </p>
          </div>

          <div className="timeline-wrapper" id="experience-timeline">
            {milestones.map((milestone, idx) => (
              <div key={idx} className="timeline-item" id={`timeline-item-${idx}`}>
                <div className="timeline-dot"></div>
                <div className="timeline-card glass-card">
                  <span className="timeline-year">{milestone.year}</span>
                  <h4>{milestone.title}</h4>
                  <p style={{ marginBottom: "15px" }}>
                      {milestone.desc}
                  </p>
                  {milestone.url && (
 <a
  href={milestone.url}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-3 text-[10px] font-bold tracking-wider uppercase text-black bg-white hover:bg-white/90 px-3 py-1.5 rounded-md transition-all shadow-lg shadow-white/5 hover:-translate-y-0.5 mt-6"
  style={{
    display:"flex",
    gap:"5px",
    width: "fit-content",
    fontFamily: "var(--font-sans)",
    fontSize: "15px",
  }}
>
  <span className="leading-none">Lihat selengkapnya</span>
  <ArrowUpRight
    size={16}
    className="shrink-0"
    style={{ transform: "translateY(3px)" }}
  />
</a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS SECTION --- */}
      <section className="section" id="testimonials">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Testimoni</span>
            <h2 className="section-title">Ulasan Klien Kami</h2>
            <p className="section-desc">
              Kepuasan klien adalah prioritas utama kami. Berikut adalah pendapat jujur dari mereka yang telah mempercayakan momen berharganya kepada Zifa Photography.
            </p>
          </div>

          <div className="testimonials-grid" id="testimonials-grid-container">
            {testimonials.map((testi, idx) => (
              <div key={idx} className="testimonial-card glass-card" id={`testi-card-${idx}`}>
                <div className="testi-stars">
                  {[...Array(testi.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="testi-text">"{testi.comment}"</p>
                <div className="testi-author">
                  <div className="testi-avatar">
                    {testi.initials}
                  </div>
                  <div className="testi-author-info">
                    <h4>{testi.name}</h4>
                    <p>{testi.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="section section-alt" id="faq">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Pertanyaan Umum</span>
            <h2 className="section-title">Informasi & Bantuan</h2>
            <p className="section-desc">
              Berikut adalah beberapa jawaban atas pertanyaan yang paling sering diajukan mengenai layanan, booking, proses, serta pengiriman karya kami.
            </p>
          </div>

          <div className="faq-wrapper" id="faq-accordions">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className={`faq-item ${activeFaq === idx ? 'active' : ''}`}
                onClick={() => toggleFaq(idx)}
                id={`faq-item-${idx}`}
              >
                <div className="faq-question">
                  <h4>{faq.question}</h4>
                  <span className="faq-icon">
                    <X size={18} style={{ transform: activeFaq === idx ? 'none' : 'rotate(45deg)' }} />
                  </span>
                </div>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* --- KONTAK SECTION --- */}
      <section className="section" id="contact">
        <div className="container">
          <div className="contact-grid">
            
            <div className="contact-info" id="contact-details">
              <div>
                <span className="section-tag">Kontak</span>
                <h2 className="section-title" style={{ textAlign: 'left', margin: '12px 0 16px 0' }}>Mari Abadikan Cerita Anda</h2>
                <p className="contact-info-desc">
                  Ada pertanyaan mengenai paket harga, penawaran khusus, atau ketersediaan tanggal pemotretan? Zifa Photography selalu siap membantu merancang konsep dokumentasi terbaik untuk Anda.
                </p>
              </div>

              <div className="contact-method-list">
                <div className="contact-method-card glass-card">
                  <span className="contact-method-icon"><FaWhatsapp  size={18} /></span>
                  <div className="contact-method-details">
                    <h4>WhatsApp Fast Response</h4>
                    <p>{contactInfo.no_whatsapp}</p>
                  </div>
                </div>

                {/* <div className="contact-method-card glass-card">
                  <span className="contact-method-icon"><Mail size={18} /></span>
                  <div className="contact-method-details">
                    <h4>Email Resmi</h4>
                    <p>{contactInfo.email}</p>
                  </div>
                </div> */}

                <div className="contact-method-card glass-card">
                  <span className="contact-method-icon"><MapPin size={18} /></span>
                  <div className="contact-method-details">
                    <h4>Lokasi</h4>
                    <p>{contactInfo.alamat}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card contact-form-container" id="contact-form-block">
              {formSubmitted ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }} id="form-success-alert">
                  <span className="hero-feature-icon" style={{ width: '64px', height: '64px', margin: '0 auto 24px auto', fontSize: '24px' }}>
                    <CheckCircle2 size={32} />
                  </span>
                  <h3 style={{ fontSize: '24px', marginBottom: '12px' }}>Pesan Terkirim!</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px', maxWidth: '360px', margin: '0 auto 24px auto' }}>
                    Terima kasih telah menghubungi Zifa Photography. Zifa Photography akan segera menghubungi Anda dalam waktu 1x24 jam.
                  </p>
                  <button className="btn-primary" onClick={() => setFormSubmitted(false)}>Kirim Pesan Lain</button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleFormSubmit} id="client-contact-form">
                  <div>
                    <h3 className="form-title">Kirim Pesan</h3>
                    <p className="form-desc">Isi formulir di bawah ini untuk mengirim pesan langsung ke kotak masuk Zifa Photography.</p>
                  </div>

                  <div className="form-group">
                    <label htmlFor="form-name">Nama Lengkap</label>
                    <input 
                      type="text" 
                      id="form-name" 
                      className="form-input" 
                      placeholder="Zidane" 
                      required 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="form-message">Pesan Anda / Paket Yang Diinginkan</label>
                    <textarea 
                      id="form-message" 
                      className="form-input" 
                      placeholder="Halo Zifa Photography, saya ingin bertanya..." 
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="btn-primary" 
                    style={{ width: '100%', gap: '12px' }} 
                    id="form-submit-btn"
                    disabled={!formData.name.trim() || !formData.message.trim()}
                  >
                    Kirim Pesan <Send size={16} />
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="footer" id="main-footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand" id="footer-brand-info">
              <h3>ZIFA PHOTOGRAPHY</h3>
              <p>
                Menghadirkan seni dokumentasi visual dengan mutu kelas premium. Menjaga setiap lembar kenangan Anda tetap segar, hidup, dan penuh keindahan sepanjang masa.
              </p>
              <div className="footer-socials">
                   <a href={`https://wa.me/${contactInfo.no_whatsapp.replace(/[^0-9]/g, '').startsWith('0') ? '62' + contactInfo.no_whatsapp.replace(/[^0-9]/g, '').substring(1) : contactInfo.no_whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="social-icon" aria-label="WhatsApp Zifa Photography"><FaWhatsapp  size={18} /></a> 
                
                <a href={contactInfo.instagram} target="_blank" rel="noreferrer" className="social-icon" aria-label="Instagram Zifa Photography"><Instagram size={18} /></a>
                <a href={contactInfo.tiktok} target="_blank" rel="noreferrer" className="social-icon" aria-label="TikTok Zifa Photography">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                  </svg>
                </a>
                {/* <a href={contactInfo.facebook} target="_blank" rel="noreferrer" className="social-icon" aria-label="Facebook Zifa Photography"><Facebook size={18} /></a> */}
                {/* <a href={contactInfo.youtube} target="_blank" rel="noreferrer" className="social-icon" aria-label="YouTube Zifa Photography"><Youtube size={18} /></a> */}
              
                {/* <a href={`mailto:${contactInfo.email}`} className="social-icon" aria-label="Email Zifa Photography"><Mail size={18} /></a> */}
              </div>
              <div style={{ marginTop: '24px' }} id="footer-sponsor-info">
                <p style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '10px', fontWeight: 500 }}>Didukung Oleh</p>
                <img 
                  src={brandLogo}
                  alt="Zifa Photography Brand Logo" 
                  style={{ height: '56px', width: 'auto', opacity: 0.85, filter: 'contrast(1.1)' }} 
                  referrerPolicy="no-referrer" 
                />
              </div>
            </div>

            <div className="footer-column">
              <h4>Layanan Kami</h4>
              <ul className="footer-links">
                {services.map((svc, idx) => (
                  <li key={idx}><a href="#portfolio" className="footer-link">{svc}</a></li>
                ))}
              </ul>
            </div>

            <div className="footer-column">
              <h4>Navigasi Cepat</h4>
              <ul className="footer-links">
                <li><a href="#home" className="footer-link">Beranda</a></li>
                <li><a href="#about" className="footer-link">Tentang Kami</a></li>
                <li><a href="#portfolio" className="footer-link">Pratinjau Foto</a></li>
                <li><a href="#experience" className="footer-link">Pengalaman</a></li>
                <li><a href="#faq" className="footer-link">Pertanyaan Umum</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Hubungi Kami</h4>
              <ul className="footer-links">
                <li className="footer-link" style={{ display: 'flex', gap: '8px' }}><MapPin size={14} style={{ flexShrink: 0, marginTop: '3px' }} /> {contactInfo.alamat.split(',')[contactInfo.alamat.split(',').length - 2] || "Mojokerto"}, {contactInfo.alamat.split(',')[contactInfo.alamat.split(',').length - 1] || "Jawa Timur"}</li>
                <li className="footer-link" style={{ display: 'flex', gap: '8px' }}><Phone size={14} style={{ flexShrink: 0, marginTop: '3px' }} /> {contactInfo.no_whatsapp}</li>
                {/* <li className="footer-link" style={{ display: 'flex', gap: '8px' }}><Mail size={14} style={{ flexShrink: 0, marginTop: '3px' }} /> {contactInfo.email}</li> */}
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2026 Zifa Photography. All rights reserved. Crafted to perfection.</p>
           
          </div>
        </div>
      </footer>

      {/* --- LIGHTBOX MODAL (WOW INTERACTIVE LIGHTBOX) --- */}
      {selectedPhoto && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(5, 7, 10, 0.95)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            padding: '40px'
          }}
          onClick={() => setSelectedPhoto(null)}
          id="photo-lightbox-modal"
        >
          <button 
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              color: 'var(--text-primary)',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-color)',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={() => setSelectedPhoto(null)}
            aria-label="Close Lightbox"
            id="lightbox-close-btn"
          >
            <X size={24} />
          </button>
          
          <img 
            src={selectedPhoto} 
            alt={selectedPhotoTitle || "Enlarged view"} 
            style={{
              maxWidth: '90%',
              maxHeight: '75vh',
              objectFit: 'contain',
              borderRadius: '16px',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-glow-large)'
            }}
            referrerPolicy="no-referrer"
          />
          
          {selectedPhotoTitle && (
            <h3 
              style={{ 
                marginTop: '24px', 
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-display)',
                fontSize: '20px',
                textAlign: 'center'
              }}
            >
              {selectedPhotoTitle}
            </h3>
          )}
          <p style={{ color: 'var(--accent-cyan)', fontSize: '13px', fontFamily: 'var(--font-mono)', marginTop: '6px' }}>
            Zifa Photography Portfolio ● Original Asset
          </p>
        </div>
      )}
    </div>
  );
}

