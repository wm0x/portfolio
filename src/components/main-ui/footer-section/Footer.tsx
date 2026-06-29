"use client";
import { FaGithub, FaLinkedin, FaEnvelope, FaFileDownload } from "react-icons/fa";



export default function FooterSection() {
  return (
    <section dir="rtl" className="w-full rounded-4xl  ">
      <footer className="rounded-4xl ">
        <div className="w-full h-full bg-transparent rounded-4xl ">
          <div className="sticky z-0 bottom-0 left-0 rounded-4xl ">
            <div className="relative w-full min-h-[500px] bg-[#252422] flex flex-col justify-between px-8 md:px-16 py-12 rounded-3xl overflow-hidden text-[#fffcf2]">
              
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#fffcf2_1px,transparent_1px),linear-gradient(to_bottom,#fffcf2_1px,transparent_1px)] bg-size-[28px_28px]" />

              <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none rounded-3xl"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                  backgroundSize: "200px 200px",
                }}
              />


              <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-12">

                <div className="space-y-5 max-w-sm">
                  <div className="flex items-center">
                    <h3 className="text-2xl font-bold tracking-tight text-[#fffcf2]">
                      علي محمـد <span className="text-[#eb5e28]">الشهري</span>
                    </h3>
                  </div>

                  <p className="text-[#ccc5b9] text-sm leading-relaxed">
                    مطور ويب ومتخصص في تقنيات الذكاء الاصطناعي. أهتم ببناء تطبيقات ويب قابلة للتوسع وحلول تعتمد على التعلم العميق.
                  </p>

                  <div className="flex items-center gap-1.5 pt-1">

                  </div>

                  <div className="inline-flex items-center gap-2 rounded-full border border-[#403d39] bg-[#403d39]/30 px-3 py-1.5 backdrop-blur-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-[#eb5e28] opacity-60" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#eb5e28]" />
                    </span>
                    <span className="text-[11px] font-medium text-[#ccc5b9] tracking-wide">
                      متاح لفرص العمل · 2026
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-12 md:gap-24">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-[#eb5e28] mb-5">
                      لتحميل السيرة
                    </h4>
                    <ul className="space-y-4">
                      <li>
                        <a
                          href="/pdf/Ali_Alshehri_CV.pdf"
                          target="_blank"
                          className="group flex items-center gap-2.5 text-sm text-[#ccc5b9] hover:text-[#fffcf2] transition-all duration-200 font-medium bg-[#403d39]/40 px-4 py-2 rounded-lg border border-[#403d39] hover:border-[#eb5e28]/50"
                        >
                          <FaFileDownload className="text-[#eb5e28] text-lg" />
                          تحميل السيرة الذاتية
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-[#eb5e28] mb-5">
                      تواصل معي
                    </h4>
                    <ul className="space-y-4">
                      <li>
                        <a
                          href="mailto:ali@alshehri.work"
                          className="group flex items-center gap-3 text-sm text-[#ccc5b9] hover:text-[#fffcf2] transition-all duration-200"
                        >
                          <FaEnvelope className="text-lg transition-colors duration-200 group-hover:text-[#eb5e28]" />
                          البريد الإلكتروني
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://linkedin.com/in/yourusername"
                          target="_blank"
                          rel="noreferrer"
                          className="group flex items-center gap-3 text-sm text-[#ccc5b9] hover:text-[#fffcf2] transition-all duration-200"
                        >
                          <FaLinkedin className="text-lg transition-colors duration-200 group-hover:text-[#eb5e28]" />
                          LinkedIn
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="relative z-10 mt-auto pt-16">
                <div
                  className="flex flex-col md:flex-row justify-between items-center gap-4 border-t pb-0 pt-5 border-[#403d39]"
                >
                  <span className="text-[12px] text-[#ccc5b9] tracking-wide">
                  2026 ©   جميع الحقوق محفوظة.
                  </span>
                </div>


              </div>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}