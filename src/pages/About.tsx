import { Link } from "react-router-dom";
import { PageHero, SectionHeading, GlassCard, StatCard, SectionDivider } from "@/components/ui/shared";
import { Shield, Award, Users, Target, Building2, Heart, Lightbulb, CheckCircle2, Pencil, Cog, Clock, Monitor, HeadphonesIcon, Home, Building, Hospital, Hotel, Factory } from "lucide-react";

const values = [
  { icon: <Pencil className="w-6 h-6" />, title: "Design Excellence", desc: "Every elevator is thoughtfully designed to complement the architecture and aesthetics of your space." },
  { icon: <Cog className="w-6 h-6" />, title: "Engineering Precision", desc: "Precision-engineered components ensure smooth, safe, and reliable operation for years to come." },
  { icon: <Clock className="w-6 h-6" />, title: "Disciplined Delivery", desc: "We commit to timelines and deliver projects on schedule without compromising quality." },
  { icon: <Monitor className="w-6 h-6" />, title: "Digital Transparency", desc: "Real-time project tracking and IoT-enabled monitoring keep you informed at every step." },
  { icon: <HeadphonesIcon className="w-6 h-6" />, title: "Lifetime Support Commitment", desc: "Our relationship doesn't end at installation — we provide dedicated support throughout the elevator's lifecycle." },
];

const industries = [
  { icon: <Home className="w-6 h-6" />, label: "Residential Complexes" },
  { icon: <Building className="w-6 h-6" />, label: "Commercial Complexes" },
  { icon: <Hospital className="w-6 h-6" />, label: "Hospitals & Healthcare" },
  { icon: <Hotel className="w-6 h-6" />, label: "Hotels & Malls" },
  { icon: <Factory className="w-6 h-6" />, label: "Industrial Facilities" },
];

const certifications = [
  "ISO 9001:2015 Quality Management",
  "CE Marked Elevator Systems",
  "BIS Approved Components",
  "IoT Certified Systems",
];

const registrations = [
  "Udyam Registration",
  "MSME Registered",
  "Startup India Certified",
  "GST Registered",
  "Suppliers: Versatile",
];

const About = () => (
  <>
    <PageHero badge="About Us" title="About X Elevators Pvt Ltd" subtitle="We are a next-generation elevator company focused on delivering safe, smart, and stylish vertical transportation solutions across India. Founded with a vision to redefine the elevator industry through quality engineering, digital transparency, and customer-first approach." backgroundImage="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80" />

    <section className="py-20">
      <SectionDivider />
      <div className="container mx-auto px-4 lg:px-8 pt-8">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <StatCard value="75+" label="Projects Installed" icon={<Building2 className="w-7 h-7" />} />
          <StatCard value="120+" label="Happy Customers" icon={<Users className="w-7 h-7" />} />
          <StatCard value="99%" label="Automation" icon={<Target className="w-7 h-7" />} />
        </div>
      </div>
    </section>

    <section className="py-20 section-glow relative">
      <SectionDivider />
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl pt-8 relative z-10">
        <SectionHeading badge="Our Story" title="The Brand Story" />
        <div className="space-y-4 text-muted-foreground text-base leading-relaxed">
          <p>X Elevators was founded by <strong className="text-foreground">Mohammed Anas</strong> (Founder & CEO) and <strong className="text-foreground">Mohammed Asif</strong> (COO) with a bold mission — to bring world-class elevator solutions to every corner of India.</p>
          <p>The letter "X" in our name represents everything we stand for:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
            {["Excellence", "Exceeding Expectations", "Exclusivity", "Extraordinary"].map((x, i) => (
              <GlassCard key={x} className="p-4 text-center" premium delay={i * 0.08}>
                <span className="text-primary font-heading font-bold text-lg text-shadow-glow">X</span>
                <p className="text-foreground text-sm font-medium mt-1">{x}</p>
              </GlassCard>
            ))}
          </div>
          <p>From a passionate team of engineers to a growing company serving clients across multiple states, our journey has been driven by an unwavering commitment to quality, safety, and customer satisfaction.</p>
        </div>
      </div>
    </section>

    <section className="py-20 relative">
      <SectionDivider />
      <div className="container mx-auto px-4 lg:px-8 pt-8">
        <SectionHeading badge="Core Values" title="What Defines Us" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {values.map((v, i) => (
            <GlassCard key={i} className="p-6 text-center" premium delay={i * 0.08}>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary mx-auto mb-4 icon-glow">{v.icon}</div>
              <h3 className="text-lg font-heading font-semibold text-foreground mb-2">{v.title}</h3>
              <p className="text-muted-foreground text-sm">{v.desc}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 section-glow relative">
      <SectionDivider />
      <div className="container mx-auto px-4 lg:px-8 pt-8 relative z-10">
        <SectionHeading badge="Leadership" title="Our Team" subtitle="Led by experienced professionals committed to elevating your experience" />
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {[
            { name: "Mohammed Anas", role: "Founder & CEO", desc: "Visionary leader with deep expertise in elevator engineering and business strategy." },
            { name: "Mohammed Asif", role: "Chief Operating Officer", desc: "Operations expert ensuring seamless project delivery and customer satisfaction." },
          ].map((m, i) => (
            <GlassCard key={i} className="p-6 text-center" premium delay={i * 0.1}>
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-secondary to-navy-light flex items-center justify-center mx-auto mb-4 border border-primary/10">
                <span className="text-2xl font-heading font-bold text-gradient-gold">{m.name.split(" ").map(n => n[0]).join("")}</span>
              </div>
              <h3 className="text-lg font-heading font-semibold text-foreground">{m.name}</h3>
              <p className="text-primary text-sm font-medium mb-2">{m.role}</p>
              <p className="text-muted-foreground text-sm">{m.desc}</p>
            </GlassCard>
          ))}
        </div>
        <div className="text-center mt-8">
          <GlassCard className="inline-block p-6" premium>
            <p className="text-gradient-gold text-3xl font-heading font-bold text-shadow-glow">25+</p>
            <p className="text-muted-foreground text-sm">Team Members</p>
          </GlassCard>
        </div>
      </div>
    </section>

    <section className="py-20 relative">
      <SectionDivider />
      <div className="container mx-auto px-4 lg:px-8 pt-8">
        <SectionHeading badge="Industries" title="Industries We Serve" />
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
          {industries.map((ind, i) => (
            <GlassCard key={ind.label} className="p-5 text-center" premium delay={i * 0.08}>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary mx-auto mb-3 icon-glow">{ind.icon}</div>
              <span className="text-foreground text-sm font-medium">{ind.label}</span>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 relative">
      <SectionDivider />
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl pt-8">
        <SectionHeading badge="Quality" title="Certifications & Compliance" />
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-foreground font-heading font-semibold mb-4 text-lg">Certifications & Standards</h3>
            <div className="space-y-3">
              {certifications.map((cert, i) => (
                <GlassCard key={cert} className="p-4 flex items-center gap-3" premium delay={i * 0.06}>
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-foreground text-sm font-medium">{cert}</span>
                </GlassCard>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-foreground font-heading font-semibold mb-4 text-lg">Registration Details</h3>
            <div className="space-y-3">
              {registrations.map((reg, i) => (
                <GlassCard key={reg} className="p-4 flex items-center gap-3" premium delay={i * 0.06}>
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-foreground text-sm font-medium">{reg}</span>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="py-20 section-glow relative">
      <SectionDivider />
      <div className="container mx-auto px-4 lg:px-8 text-center max-w-2xl pt-8 relative z-10">
        <SectionHeading badge="Get Started" title="Ready to Elevate?" subtitle="Let our experts help you find the perfect elevator solution" />
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/contact" className="bg-gradient-to-r from-primary to-gold-light text-primary-foreground px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300 hover:shadow-[0_0_30px_hsl(43_66%_52%/0.3)] hover:scale-105">
            Request Free Site Inspection
          </Link>
          <a href="https://wa.me/919844002026" target="_blank" rel="noopener noreferrer" className="border border-primary/20 text-foreground px-8 py-4 rounded-xl font-semibold text-base hover:bg-primary/10 hover:border-primary/30 transition-all duration-300">
            Chat with Engineer on WhatsApp
          </a>
        </div>
      </div>
    </section>
  </>
);

export default About;
