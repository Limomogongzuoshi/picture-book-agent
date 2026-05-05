'use client';

import { useState, useEffect } from 'react';

// 项目数据
const projects = [
  {
    id: 1,
    title: '智能电商平台',
    description: '从零到一构建的新一代电商平台，运用AI个性化推荐技术，用户留存提升40%。',
    link: '#',
    tags: ['AI', '电商', 'B2C'],
    color: 'from-amber-500 to-orange-600'
  },
  {
    id: 2,
    title: '企业协作系统',
    description: '重构团队协作工具，引入实时文档和任务管理，工作效率提升65%。',
    link: '#',
    tags: ['SaaS', '协作', 'B2B'],
    color: 'from-emerald-500 to-teal-600'
  },
  {
    id: 3,
    title: '金融科技应用',
    description: '设计的智能理财应用，帮助用户更好地管理资产，用户满意度达95%。',
    link: '#',
    tags: ['Fintech', '金融', '移动端'],
    color: 'from-violet-500 to-purple-600'
  },
  {
    id: 4,
    title: '健康管理平台',
    description: '从用户洞察出发，打造的一站式健康管理解决方案，DAU突破100万。',
    link: '#',
    tags: ['Health', 'IoT', '消费级'],
    color: 'from-rose-500 to-pink-600'
  }
];

// 技能标签
const skills = [
  { name: '产品战略', level: 95 },
  { name: '用户研究', level: 90 },
  { name: '数据分析', level: 88 },
  { name: '交互设计', level: 85 },
  { name: '项目管理', level: 92 },
  { name: 'A/B测试', level: 87 },
  { name: '增长黑客', level: 84 },
  { name: '敏捷开发', level: 90 }
];

// 联系方式
const contactInfo = [
  { platform: 'Email', value: 'product@example.com', icon: '✉️' },
  { platform: 'LinkedIn', value: 'linkedin.com/in/product', icon: '💼' },
  { platform: 'Twitter', value: '@productpm', icon: '🐦' },
  { platform: 'GitHub', value: 'github.com/product', icon: '💻' }
];

export default function PortfolioPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]" />
      </div>

      <div className="relative z-10">
        {/* 导航栏 */}
        <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-slate-950/60 border-b border-white/5">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="font-medium text-amber-400 tracking-tight">PM Portfolio</div>
              <div className="flex gap-8 text-sm">
                <a href="#about" className="text-slate-400 hover:text-amber-400 transition-colors">关于</a>
                <a href="#projects" className="text-slate-400 hover:text-amber-400 transition-colors">项目</a>
                <a href="#skills" className="text-slate-400 hover:text-amber-400 transition-colors">技能</a>
                <a href="#contact" className="text-slate-400 hover:text-amber-400 transition-colors">联系</a>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero 区域 */}
        <section className="min-h-screen flex items-center pt-20">
          <div className="max-w-6xl mx-auto px-6 py-24">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="space-y-2">
                  <p className="text-amber-400 font-medium tracking-widest uppercase text-sm">产品经理</p>
                  <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-tight">
                    <span className="block">创造</span>
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-500">卓越体验</span>
                  </h1>
                </div>
                <p className="text-xl text-slate-400 leading-relaxed max-w-lg">
                  专注于发现用户痛点，用数据驱动决策，将创意转化为令人喜爱的产品。
                </p>
                <div className="flex gap-4">
                  <a href="#projects" className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-semibold rounded-lg hover:shadow-lg hover:shadow-amber-500/25 transition-all hover:-translate-y-1">
                    查看项目
                  </a>
                  <a href="#contact" className="px-8 py-4 border border-white/20 rounded-lg hover:bg-white/5 transition-all hover:-translate-y-1">
                    联系我
                  </a>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 p-1 shadow-2xl">
                  <div className="w-full h-full rounded-xl bg-gradient-to-br from-amber-500/20 via-transparent to-violet-500/20 flex items-center justify-center">
                    <div className="text-8xl">👨‍💼</div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl shadow-xl shadow-amber-500/25" />
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl shadow-xl shadow-violet-500/25" />
              </div>
            </div>
          </div>
        </section>

        {/* 关于部分 */}
        <section id="about" className="py-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold mb-8 text-amber-400">关于我</h2>
              <div className="space-y-6 text-lg text-slate-300 leading-relaxed">
                <p>
                  我是一名拥有6年经验的产品经理，专注于数字产品的创新与优化。我相信优秀的产品源于对用户的深刻理解和对细节的极致追求。
                </p>
                <p>
                  我的工作方法是：通过用户研究发现真实需求，用数据指导决策，与设计和技术团队紧密协作，最终交付真正有价值的产品。
                </p>
                <div className="grid grid-cols-3 gap-8 pt-4">
                  <div className="text-center p-6 bg-slate-900/50 rounded-xl border border-white/5">
                    <div className="text-4xl font-bold text-amber-400">6+</div>
                    <div className="text-slate-400 text-sm mt-1">年经验</div>
                  </div>
                  <div className="text-center p-6 bg-slate-900/50 rounded-xl border border-white/5">
                    <div className="text-4xl font-bold text-amber-400">20+</div>
                    <div className="text-slate-400 text-sm mt-1">上线项目</div>
                  </div>
                  <div className="text-center p-6 bg-slate-900/50 rounded-xl border border-white/5">
                    <div className="text-4xl font-bold text-amber-400">5M+</div>
                    <div className="text-slate-400 text-sm mt-1">服务用户</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 项目部分 */}
        <section id="projects" className="py-24 bg-slate-900/30">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-16 text-amber-400">精选项目</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <a
                  key={project.id}
                  href={project.link}
                  className="group relative bg-slate-900/80 rounded-2xl border border-white/5 overflow-hidden hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`h-2 bg-gradient-to-r ${project.color}`} />
                  <div className="p-8">
                    <div className="flex gap-2 mb-4">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs font-medium bg-white/5 rounded-full text-slate-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-amber-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 mb-6 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex items-center gap-2 text-amber-400 font-medium">
                      <span>查看详情</span>
                      <span className="group-hover:translate-x-2 transition-transform">→</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* 技能部分 */}
        <section id="skills" className="py-24">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-16 text-amber-400">专业技能</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {skills.map((skill, index) => (
                <div key={skill.name} className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-amber-400 text-sm">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-orange-600 rounded-full"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 联系方式 */}
        <section id="contact" className="py-24 bg-slate-900/30">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4 text-amber-400">联系我</h2>
            <p className="text-slate-400 mb-12 text-lg">期待与你的合作，一起创造优秀的产品</p>
            <div className="grid md:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <a
                  key={info.platform}
                  href="#"
                  className="group p-6 bg-slate-900/60 rounded-xl border border-white/5 hover:border-amber-500/30 hover:bg-slate-900/80 transition-all"
                >
                  <div className="text-3xl mb-3">{info.icon}</div>
                  <div className="text-sm text-slate-400 mb-1">{info.platform}</div>
                  <div className="font-medium group-hover:text-amber-400 transition-colors">
                    {info.value}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* 页脚 */}
        <footer className="py-12 border-t border-white/5">
          <div className="max-w-6xl mx-auto px-6 text-center text-slate-500 text-sm">
            <p>© 2024 Product Manager Portfolio. 用心设计，创造价值。</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
