import { motion } from 'motion/react';
import { Mail, Github, Linkedin, ExternalLink } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 mesh-gradient">
      <div className="max-w-3xl mx-auto">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] p-10 md:p-16 border border-gray-100 shadow-xl"
        >
          <div className="flex flex-col md:flex-row gap-10 items-center md:items-start mb-12">
            <div className="w-32 h-32 rounded-3xl overflow-hidden shadow-lg shrink-0">
               <img 
                  src="/avatar.jpg" 
                  alt="Gred Avatar"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544568100-847a948585b9?w=400&h=400&fit=crop';
                  }}
                />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-4">About Gred</h1>
              <p className="text-xl text-gray-600 leading-relaxed font-medium">
                关注数据分析、AI 产品与城市空间应用。
              </p>
            </div>
          </div>
          
          <div className="space-y-8 text-gray-700 text-lg leading-relaxed">
            <p>
              我是 Gred。我擅长将研究型数据、复杂的业务逻辑和优雅的交互界面相结合，形成可展示、可复用、且具备高度可解释性的作品集项目。
            </p>
            <p>
              在我的作品中，你会看到对金融地产（REITs）数据的深度挖掘，也能看到对最新 AI 模型如何落地到具体用户场景（CityVibe）的深刻思考。我追求的是“技术与场景的完美融合”，力求让每一行代码和每一个像素都服务于最终的业务决策或用户体验。
            </p>
          </div>

          <div className="mt-10 inline-flex rounded-full bg-gray-50 px-4 py-2 text-base font-bold text-gray-700 ring-1 ring-gray-100">
            作者：李军
          </div>

          <div className="mt-16 pt-10 border-t border-gray-100">
            <h3 className="font-bold text-gray-400 uppercase tracking-widest text-sm mb-6">联系我 / Contact</h3>
            <div className="flex flex-col gap-4">
              <a 
                href="mailto:ljun9958@gmail.com" 
                className="flex items-center gap-3 text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors group"
              >
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                  <Mail size={20} />
                </div>
                ljun9958@gmail.com
              </a>
              <div className="flex gap-4 mt-2">
                <div className="px-4 py-2 bg-gray-50 rounded-lg text-sm text-gray-500">WeChat: Gred</div>
                <div className="px-4 py-2 bg-gray-50 rounded-lg text-sm text-gray-500">Location: Beijing / Guangzhou / Shanghai</div>
              </div>
            </div>
          </div>
        </motion.section>
        
        <footer className="mt-12 text-center text-gray-400 text-sm">
           © 2026 Designed as a portfolio case study by Gred.
        </footer>
      </div>
    </div>
  );
}
