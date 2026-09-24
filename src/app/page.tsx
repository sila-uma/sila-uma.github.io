import {
  getSiteSettings,
  getAbout,
  getContacts,
  getEnrollment,
  getDocuments,
  getGallery,
  getDirections,
  getNews,
  isVisible,
} from "@/lib/content";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Directions } from "@/components/Directions";
import { News } from "@/components/News";
import { Gallery } from "@/components/Gallery";
import { Partners } from "@/components/Partners";
import { Contacts } from "@/components/Contacts";
import { ContactForm } from "@/components/ContactForm";
import { SimpleSection } from "@/components/SimpleSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  const site = getSiteSettings();
  const about = getAbout();
  const contacts = getContacts();
  const enrollment = getEnrollment();
  const documents = getDocuments();
  const gallery = getGallery();
  const directions = getDirections();
  const news = getNews();

  const show = (id: string, own = true) => isVisible(site.sections, id) && own;

  return (
    <>
      <Header sections={site.sections} />
      <main>
        {show("hero") && <Hero site={site} />}
        {show("about", about.visible) && <About about={about} />}
        {show("directions") && directions.length > 0 && <Directions directions={directions} />}
        {show("news") && <News news={news} />}
        {show("gallery", gallery.visible) && <Gallery gallery={gallery} />}
        {show("partners") && <Partners />}
        {show("enrollment", enrollment.visible) && <SimpleSection id="enrollment" data={enrollment} />}
        {show("documents", documents.visible) && <SimpleSection id="documents" data={documents} />}
        {show("form") && (
          <section id="form" className="bg-white py-20 md:py-28">
            <div className="section-shell">
              <ContactForm directions={directions} />
            </div>
          </section>
        )}
        {show("contacts", contacts.visible) && <Contacts contacts={contacts} />}
      </main>
      <Footer siteTitle={site.title} />
    </>
  );
}
