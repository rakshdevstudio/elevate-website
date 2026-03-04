import { PageHero, SectionHeading, GlassCard, StatCard } from "@/components/ui/shared";
import { Shield, Award, Users, Target, Building2, Heart, Lightbulb, CheckCircle2 } from "lucide-react";

const values = [
  { icon: <Shield className="w-6 h-6" />, title: "Safety First", desc: "Uncompromising commitment to the highest safety standards in every installation." },
  { icon: <Lightbulb className="w-6 h-6" />, title: "Innovation", desc: "Continuously integrating cutting-edge technology into our elevator systems." },
  { icon: <Heart className="w-6 h-6" />, title: "Customer Focus", desc: "Building lasting relationships through exceptional service and support." },
  { icon: <Target className="w-6 h-6" />, title: "Excellence", desc: "Striving for perfection in design, engineering, and execution." },
];

const industries = [
  "Residential Complexes", "Commercial Buildings", "Hospitals & Healthcare",
  "Hotels & Hospitality", "Shopping Malls", "Educational Institutions",
  "Government Buildings", "Industrial Facilities",
];

const certifications = [
  "ISO 9001:2015 Quality Management",
  "ISO 14001:2015 Environmental Management",
  "CE Certified Elevator Systems",
  "BIS Approved Components",
  "NABL Accredited Testing",
];

const About = () => (
  <>
    <PageHero badge="About Us" title="Building Trust Since 2010" subtitle="India's premier elevator company dedicated to transforming vertical mobility with world-class solutions." />

    <section className="py-20 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <SectionHeading badge="Our Story" title="The X Elevators Journey" subtitle="From a small workshop to one of India's most trusted elevator brands" />
        <div className="space-y-4 text-muted-foreground text-base leading-relaxed">
          <p>Founded in 2010, X Elevators Pvt Ltd began with a simple yet powerful vision — to make premium vertical transportation accessible across India. What started as a team of 5 passionate engineers has grown into a full-fledged elevator company serving clients across 15+ states.</p>
          <p>Over the years, we've installed 500+ elevators across residential, commercial, and institutional projects. Our commitment to quality, safety, and innovation has earned us the trust of architects, builders, and homeowners alike.</p>
        </div>
      </div>
    </section>

    <section className="py-20 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading badge="Core Values" title="What Drives Us" />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <GlassCard key={i} className="p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">{v.icon}</div>
              <h3 className="text-lg font-heading font-semibold text-foreground mb-2">{v.title}</h3>
              <p className="text-muted-foreground text-sm">{v.desc}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard value="500+" label="Installations" icon={<Building2 className="w-7 h-7" />} />
          <StatCard value="15+" label="Years Experience" icon={<Award className="w-7 h-7" />} />
          <StatCard value="200+" label="Happy Clients" icon={<Users className="w-7 h-7" />} />
          <StatCard value="15+" label="States Covered" icon={<Target className="w-7 h-7" />} />
        </div>
      </div>
    </section>

    <section className="py-20 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading badge="Leadership" title="Meet Our Team" subtitle="Experienced professionals committed to elevating your experience" />
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { name: "Rajesh Kumar", role: "Founder & CEO", desc: "20+ years in elevator engineering" },
            { name: "Priya Sharma", role: "Head of Operations", desc: "Expert in project management" },
            { name: "Anil Mehta", role: "Chief Engineer", desc: "Specialist in smart elevator tech" },
          ].map((m, i) => (
            <GlassCard key={i} className="p-6 text-center">
              <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-heading font-bold text-primary">{m.name.split(" ").map(n => n[0]).join("")}</span>
              </div>
              <h3 className="text-lg font-heading font-semibold text-foreground">{m.name}</h3>
              <p className="text-primary text-sm font-medium mb-2">{m.role}</p>
              <p className="text-muted-foreground text-sm">{m.desc}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading badge="Industries" title="Industries We Serve" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {industries.map((ind) => (
            <GlassCard key={ind} className="p-4 text-center">
              <span className="text-foreground text-sm font-medium">{ind}</span>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <SectionHeading badge="Quality" title="Certifications" subtitle="Industry-recognized certifications ensuring the highest quality standards" />
        <div className="space-y-3">
          {certifications.map((cert) => (
            <GlassCard key={cert} className="p-4 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span className="text-foreground text-sm font-medium">{cert}</span>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default About;
