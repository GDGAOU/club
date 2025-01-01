"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsGithub, BsLinkedin, BsTwitter, BsYoutube, BsArrowUpCircle } from "react-icons/bs";

const footerLinks = {
  about: [
    { label: "About Us", href: "/about" },
    { label: "Team", href: "/team" },
    { label: "Contact", href: "/contact" },
  ],
  resources: [
    { label: "Events", href: "/events" },
    { label: "Blog", href: "/blog" },
    { label: "Projects", href: "/projects" },
  ],
  community: [
    { label: "Join GDSC", href: "/join" },
    { label: "Code of Conduct", href: "/code-of-conduct" },
    { label: "FAQ", href: "/faq" },
  ],
};

const socialLinks = [
  { icon: BsGithub, href: "https://github.com" },
  { icon: BsLinkedin, href: "https://linkedin.com" },
  { icon: BsTwitter, href: "https://twitter.com" },
  { icon: BsYoutube, href: "https://youtube.com" },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-black pt-20 pb-10 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-25" />
      
      <div className="relative max-w-7xl mx-auto px-4">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand section */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4"
            >
              GDSC AOU
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 mb-6"
            >
              Empowering students to learn, grow, and innovate together.
            </motion.p>
            
            {/* Social links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ y: -2, scale: 1.1 }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links sections */}
          {Object.entries(footerLinks).map(([title, links], sectionIndex) => (
            <div key={title}>
              <motion.h4
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + sectionIndex * 0.1 }}
                className="text-white font-semibold mb-4 capitalize"
              >
                {title}
              </motion.h4>
              <ul className="space-y-2">
                {links.map((link, linkIndex) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + sectionIndex * 0.1 + linkIndex * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors hover:underline"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-gray-400 text-sm"
            >
              © {new Date().getFullYear()} GDSC AOU. All rights reserved.
            </motion.p>

            {/* Back to top button */}
            <motion.button
              onClick={scrollToTop}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              whileHover={{ y: -2, scale: 1.1 }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <BsArrowUpCircle className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
