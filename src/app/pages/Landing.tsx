import { useNavigate } from 'react-router';
import { CustomButton } from '@/components/CustomButton';
import { paths } from '@/utils/paths';
import {
  FiCpu,
  FiLayout,
  FiShield,
  FiTrendingUp,
  FiArrowRight,
} from 'react-icons/fi';

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      {/* Ambient Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse-slow delay-1000" />
      </div>

      {/* Navbar / Header */}
      <header className="relative z-10 px-6 py-6 flex justify-center items-center max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2 font-black text-2xl tracking-tighter">
          <div className="p-2 bg-linear-to-tr from-primary to-blue-600 rounded-lg text-white">
            <FiCpu size={24} />
          </div>
          <span className="bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/70">
            LLM Helper
          </span>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 relative z-10 flex flex-col justify-center items-center text-center px-4 sm:px-6 pt-10 pb-20">
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in zoom-in duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card border border-card-foreground/10 text-xs font-semibold text-primary mb-4 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            New AI Engine Available
          </div>

          <h1 className="text-5xl sm:text-7xl text-foreground font-black tracking-tight leading-[1.1]">
            Master Your Assessments <br className="hidden sm:block" />
            with{' '}
            <span className="bg-clip-text text-transparent bg-linear-to-br from-primary via-blue-500 to-purple-600">
              AI Precision
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Streamline your testing process, unlock deep analytics, and empower
            your workflow with our advanced LLM-powered assistant. Secure, fast,
            and intelligent.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <CustomButton
              onClick={() => navigate(paths.auth.register.path)}
              className="w-full! sm:w-auto! h-14! px-8! text-lg! shadow-primary/25 shadow-xl"
              icon={<FiArrowRight />}
            >
              Start for Free
            </CustomButton>
            <button
              onClick={() => navigate(paths.auth.login.path)}
              className="px-8 h-14 rounded-2xl font-bold bg-primary-foreground border border-card-foreground/10 hover:bg-card-foreground/5 transition-all text-focus-dark -full sm:w-auto"
            >
              Existing User
            </button>
          </div>

          {/* Stats / Social Proof */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-80">
            <div className="flex flex-col items-center">
              <span className="font-bold text-2xl text-foreground">10k+</span>
              <span className="text-sm text-muted-foreground">
                Tests Analyzed
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-2xl text-foreground">99%</span>
              <span className="text-sm text-muted-foreground">Accuracy</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-2xl text-foreground">24/7</span>
              <span className="text-sm text-muted-foreground">
                AI Availability
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-2xl text-foreground">5.0</span>
              <span className="text-sm text-muted-foreground">User Rating</span>
            </div>
          </div>
        </div>
      </main>

      {/* Value Proposition Grid */}
      <section className="relative z-10 py-24 bg-card/30 border-t border-card-foreground/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl text-foreground font-bold mb-4">
              Everything you need to excel
            </h2>
            <p className="text-muted-foreground">
              Comprehensive tools designed to make your testing lifecycle
              effortless and efficient.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-foreground">
            {[
              {
                icon: <FiLayout className="w-6 h-6" />,
                title: 'Intuitive Interface',
                desc: 'Clean, modern dashboard that puts your most important metrics front and center.',
              },
              {
                icon: <FiTrendingUp className="w-6 h-6" />,
                title: 'Instant Analytics',
                desc: 'Get real-time insights into test performance with detailed visualizations.',
              },
              {
                icon: <FiShield className="w-6 h-6" />,
                title: 'Enterprise Security',
                desc: 'Your data is encrypted and protected with industry-leading security standards.',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-background border border-card-foreground/5 p-8 rounded-3xl shadow-sm hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-card-foreground/5 bg-background text-center">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-muted-foreground">
            © 2026 LLM Test Helper. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm font-medium text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
