import bcrypt from 'bcryptjs'
import connectDB from '@/lib/mongodb'
import Admin from '@/lib/models/Admin'
import Place from '@/lib/models/Place'
import Food from '@/lib/models/Food'
import Event from '@/lib/models/Event'
import Accommodation from '@/lib/models/Accommodation'
import GalleryItem from '@/lib/models/GalleryItem'
import MenuItem from '@/lib/models/MenuItem'
import SiteSettings from '@/lib/models/SiteSettings'

export async function GET() {
  await connectDB()

  if (!await Admin.findOne({ username: 'eyup.ozgur' })) {
    const passwordHash = await bcrypt.hash('Artvin*7.1921', 10)
    await Admin.create({ username: 'eyup.ozgur', passwordHash })
  }

  // Clear existing data
  await Place.deleteMany({})
  await Food.deleteMany({})
  await Event.deleteMany({})
  await Accommodation.deleteMany({})
  await GalleryItem.deleteMany({})
  await MenuItem.deleteMany({})

  const places = [
    { title: 'Macahel Vadisi', titleEn: 'Macahel Valley', slug: 'macahel', category: 'doğa', location: 'Borçka', description: 'UNESCO tarafından Biyosfer Rezervi ilan edilen, el değmemiş doğasıyla büyüleyen bir vadi.', descriptionEn: 'A valley enchanting with its untouched nature, declared a Biosphere Reserve by UNESCO.', images: ['/images/macahel.png'], isFeatured: true },
    { title: 'Şavşat Karagöl', titleEn: 'Şavşat Karagöl Lake', slug: 'karagol', category: 'doğa', location: 'Şavşat', description: 'Yüksek dağların arasında saklı, kristal berraklığındaki göl. Doğa yürüyüşçülerinin gözdesi.', descriptionEn: 'A crystal-clear lake hidden among high mountains, a favorite of nature hikers.', images: ['/images/karagol.png'], isFeatured: true },
    { title: 'Mençuna Şelalesi', titleEn: 'Mencuna Waterfall', slug: 'mencuna-selalesi', category: 'şelale', location: 'Arhavi', description: 'Türkiye\'nin en yüksek şelalelerinden biri. Kamilet Vadisinin derinliklerinde eşsiz bir manzara.', descriptionEn: 'One of the highest waterfalls in Turkey. A unique landscape deep in the Kamilet Valley.', images: ['/images/mencuna.png'], isFeatured: true },
    { title: 'Çifte Köprüler', titleEn: 'Twin Bridges', slug: 'cifte-kopruler', category: 'tarih', location: 'Arhavi', description: 'Ortacalar vadisinde yer alan, estetik taş işçiliği ile 18. yüzyıldan kalma tarihi iki köprü.', descriptionEn: 'Two historical bridges from the 18th century with aesthetic stonework located in the Ortacalar valley.', images: ['/images/twin_bridges.png'], isFeatured: false },
    { title: 'İşhan Manastırı', titleEn: 'Ishan Monastery', slug: 'ishan-manastiri', category: 'tarih', location: 'Yusufeli', description: 'Gürcü mimarisinin en önemli eserlerinden biri olan görkemli tarihi manastır kalıntısı.', descriptionEn: 'The majestic historical monastery ruin, one of the most important works of Georgian architecture.', images: ['https://images.unsplash.com/photo-1598424268670-2a818c7ac9c0?w=800&q=80'], isFeatured: false },
    { title: 'Artvin Atatepe', titleEn: 'Artvin Atatepe', slug: 'atatepe', category: 'diğer', location: 'Merkez', description: 'Türkiye\'nin ve dünyanın en büyük Atatürk heykelinin bulunduğu ve şehri kuş bakışı izleyebileceğiniz tepe.', descriptionEn: 'The hill where the largest Atatürk statue in Turkey and the world is located, offering a bird\'s-eye view of the city.', images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'], isFeatured: true },
    { title: 'Deriner Barajı', titleEn: 'Deriner Dam', slug: 'deriner-baraji', category: 'diğer', location: 'Merkez / Çoruh', description: 'Çoruh Nehri üzerindeki çift eğrilikli ince kemer baraj tasarımıyla mühendislik harikası devasa yapı.', descriptionEn: 'A massive engineering marvel with a double-curvature thin arch dam design on the Çoruh River.', images: ['https://images.unsplash.com/photo-1579001358327-0cfd687289ee?w=800&q=80'], isFeatured: false },
    { title: 'Cehennem Deresi Kanyonu', titleEn: 'Cehennem Deresi Canyon', slug: 'cehennem-deresi', category: 'doğa', location: 'Ardanuç', description: 'Derin kanyon yapısıyla dünyanın sayılı kanyonlarından olan nefes kesen doğa harikası.', descriptionEn: 'A breathtaking natural wonder, one of the few canyons in the world with its deep structure.', images: ['https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80'], isFeatured: false },
  ]
  await Place.insertMany(places)

  const foods = [
    { title: 'Puçuko', titleEn: 'Pucuko', slug: 'pucuko', description: "Kurutulmuş taze fasulye, buğday yarması ve salça ile hazırlanan fırınlanmış çok özel Artvin yöresel yemeği.", descriptionEn: 'A very special baked regional dish from Artvin prepared with dried green beans, wheat groats, and tomato paste.', images: ['https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80'], isFeatured: true },
    { title: 'Silor', titleEn: 'Silor', slug: 'silor', description: 'Artvin usulü, rulo yapılmış ince hamurların yoğurt ve kızgın tereyağı ile fırınlanmasıyla elde edilen efsane lezzet.', descriptionEn: 'Legendary flavor obtained by baking thinly rolled dough with yogurt and hot butter in the style of Artvin.', images: ['https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800&q=80'], isFeatured: true },
    { title: 'Kalaco', titleEn: 'Kalaco', slug: 'kalaco', description: 'Karadeniz mutfağının incisi, kavrulmuş mısır unu ve kaymaklı çökelekten yapılan doyurucu yemek.', descriptionEn: 'The pearl of Black Sea cuisine, a hearty dish made from roasted cornmeal and clotted cottage cheese.', images: ['https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80'], isFeatured: false },
    { title: 'Mıhlama / Kuymak', titleEn: 'Muhlama', slug: 'muhlama', description: "Karadeniz'in vazgeçilmezi. Mısır unu, tereyağı ve eriyen kolot peyniri ile yapılan enfes spesiyal.", descriptionEn: 'A Black Sea staple. A delicious special made with cornmeal, butter, and melting kolot cheese.', images: ['/images/mihlama.png'], isFeatured: true },
    { title: 'Laz Böreği', titleEn: 'Laz Pastry', slug: 'laz-boregi', description: 'Muhallebili, ince el açması yufkalı devasa lezzete sahip geleneksel Karadeniz tatlı böreği.', descriptionEn: 'Traditional Black Sea sweet pastry with huge flavor, custard, and thin hand-rolled phyllo dough.', images: ['https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80'], isFeatured: false },
    { title: 'Kaygana', titleEn: 'Kaygana', slug: 'kaygana', description: 'Karadeniz yeşillikleri ve yumurtayla hazırlanan omlet kıvamında inanılmaz pratik meze.', descriptionEn: 'Incredibly practical meze in the consistency of an omelet, prepared with Black Sea greens and eggs.', images: ['https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=80'], isFeatured: false },
  ]
  await Food.insertMany(foods)

  const events = [
    { title: 'Kafkasör Yaylası Kültür ve Sanat Festivali', titleEn: 'Kafkasör Plateau Culture and Art Festival', slug: 'kafkasor-festivali', date: new Date('2025-06-15'), description: "Artvin'in en köklü ve ikonik festivali. Boğa güreşleri, horon, konserler ve yöresel etkinliklerle dolu.", descriptionEn: "Artvin's most rooted and iconic festival. Full of bullfights, horon dances, concerts, and local events.", images: ['/images/kafkasor.png'], isActive: true },
    { title: 'Arhavi Mençuna Şelalesi Doğa Yürüyüşü', titleEn: 'Arhavi Mencuna Waterfall Trekking', slug: 'mencuna-doga-yuruyusu', date: new Date('2025-05-20'), description: 'Rehberler eşliğinde Kamilet Vadisinde yapılan, doğaseverlerin buluşma noktası trekking.', descriptionEn: 'Guided trekking in Kamilet Valley, the meeting point for nature lovers.', images: ['https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80'], isActive: true },
    { title: 'Yusufeli Geleneksel Karakucak Güreşleri', titleEn: 'Yusufeli Traditional Karakucak Wrestling', slug: 'yusufeli-karakucak', date: new Date('2025-10-01'), description: 'Pehlivanların er meydanına çıktığı asırlık geleneksel Karakucak güreş turnuvaları.', descriptionEn: 'Centuries-old traditional Karakucak wrestling tournaments where wrestlers take to the field.', images: ['https://images.unsplash.com/photo-1510007802877-09559bf7fd7e?w=800&q=80'], isActive: true },
    { title: 'Borçka Karagöl Kamp Şenliği', titleEn: 'Borcka Karagol Camping Festival', slug: 'borcka-karagol-kamp', date: new Date('2025-08-12'), description: 'Müzik ve doğanın iç içe geçtiği çok keyifli göl kenarı kamp ve ateş etkinlikleri.', descriptionEn: 'Very enjoyable lakeside campfire events where music and nature intertwine.', images: ['https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800&q=80'], isActive: true },
  ]
  await Event.insertMany(events)

  const accommodations = [
    { title: 'Şavşat Ahşap Dağ Evleri', titleEn: 'Savsat Wooden Mountain Lodges', slug: 'savsat-dag-evleri', type: 'pansiyon', address: 'Şavşat, Artvin', description: 'Cittaslow (Sakin Şehir) Şavşat doğasında konumlanmış, otantik yapıya sahip ahşap kütük evler.', descriptionEn: 'Log cabins with authentic structure located in the nature of Cittaslow (Slow City) Şavşat.', images: ['https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80'] },
    { title: 'Arhavi Kamilet Bungalov', titleEn: 'Arhavi Kamilet Bungalows', slug: 'arhavi-bungalov', type: 'pansiyon', address: 'Ortacalar, Arhavi', description: 'Dere kenarında lüks ahşap bungalov konaklaması, çay bahçeleriyle iç içe.', descriptionEn: 'Luxury wooden bungalow accommodation by the stream, intertwined with tea gardens.', images: ['https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&q=80'] },
    { title: 'Karahan Otel', titleEn: 'Karahan Hotel', slug: 'karahan-otel', type: 'otel', address: 'Artvin Merkez', description: 'Şehir merkezinde modern mimarisi, konforlu odaları ve muhteşem vadi manzarasıyla lüks hizmet.', descriptionEn: 'Luxury service in the city center with modern architecture, comfortable rooms, and magnificent valley views.', images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80'] },
    { title: 'Yusufeli Çoruh Pansiyon', titleEn: 'Yusufeli Coruh Pension', slug: 'yusufeli-coruh-pansiyon', type: 'pansiyon', address: 'Yusufeli', description: 'Rafting ve doğa sporlarına katılmak isteyen maceracıları ağırlayan butik pansiyon.', descriptionEn: 'Boutique pension hosting adventurers who want to participate in rafting and outdoor sports.', images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80'] },
  ]
  await Accommodation.insertMany(accommodations)

  const galleryItems = [
    { type: 'image', url: '/images/hero.png', title: 'Artvin Vadileri', order: 1 },
    { type: 'image', url: '/images/macahel.png', title: 'Macahel', order: 2 },
    { type: 'image', url: '/images/mencuna.png', title: 'Mençuna', order: 3 },
    { type: 'image', url: 'https://images.unsplash.com/photo-1544644181-052bc7e4c297?w=800&q=80', title: 'Köprüler', order: 4 },
    { type: 'image', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', title: 'Artvin Manzarası', order: 5 },
    { type: 'image', url: 'https://images.unsplash.com/photo-1579001358327-0cfd687289ee?w=800&q=80', title: 'Çoruh Nehri', order: 6 },
    { type: 'image', url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80', title: 'Kanyon Doğası', order: 7 },
    { type: 'image', url: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80', title: 'Doğal Yaşam', order: 8 },
  ]
  await GalleryItem.insertMany(galleryItems)

  const menuItems = [
    { label: 'Ana Sayfa', labelEn: 'Home', href: '/', order: 1, isVisible: true },
    { label: 'Gezilecek Yerler', labelEn: 'Places', href: '/places', order: 2, isVisible: true },
    { label: 'Yerel Lezzetler', labelEn: 'Local Flavors', href: '/food', order: 3, isVisible: true },
    { label: 'Etkinlik & Duyurular', labelEn: 'Events', href: '/events', order: 4, isVisible: true },
    { label: 'Konaklama', labelEn: 'Accommodation', href: '/accommodation', order: 5, isVisible: true },
    { label: 'Galeri', labelEn: 'Gallery', href: '/gallery', order: 6, isVisible: true },
  ]
  await MenuItem.insertMany(menuItems)

  if (!await SiteSettings.findOne()) {
    await SiteSettings.create({
      siteName: 'Artvin Yöresel Tanıtım',
      siteNameEn: 'Artvin Local Tourism',
      description: "Artvin'i keşfet — doğa, kültür, lezzetler",
      descriptionEn: 'Explore Artvin — nature, culture, flavors',
      heroImages: ['/images/hero.png'],
    })
  } else {
    await SiteSettings.updateOne({}, {
      $set: { heroImages: ['/images/hero.png'] }
    })
  }

  return Response.json({ ok: true, message: 'Harika Artvin içerikleri eklendi! (Eskiler silindi)' })
}

