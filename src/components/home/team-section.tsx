"use client";
import { motion } from "framer-motion";
import { BsGithub, BsLinkedin, BsTwitter } from "react-icons/bs";
import Image from "next/image";

const team = [
  {
    name: "John Doe",
    role: "GDSC Lead",
    image: "/team/lead.jpg", // Add these images later
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
  {
    name: "Jane Smith",
    role: "Technical Lead",
    image: "/team/tech-lead.jpg",
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
  },
  // Add more team members
];

const SocialIcon = ({ platform }: { platform: string }) => {
  switch (platform) {
    case "github":
      return <BsGithub className="w-5 h-5" />;
    case "linkedin":
      return <BsLinkedin className="w-5 h-5" />;
    case "twitter":
      return <BsTwitter className="w-5 h-5" />;
    default:
      return null;
  }
};

export function TeamSection() {
  return (
    <section className="relative py-20 bg-black overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-900/10 to-black" />

      <div className="relative max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Meet Our Team
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            The passionate individuals behind GDSC AOU who make it all happen.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className="relative p-4 rounded-xl border border-gray-800 bg-black/50 backdrop-blur-sm overflow-hidden">
                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Image container */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 opacity-75" />
                  {/* Add Image component when you have actual images */}
                  <div className="w-full h-full bg-gray-800" />
                </motion.div>

                {/* Content */}
                <div className="text-center relative z-10">
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-gray-400 mb-4">{member.role}</p>

                  {/* Social links */}
                  <div className="flex justify-center gap-4">
                    {Object.entries(member.socials).map(([platform, url]) => (
                      <motion.a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <SocialIcon platform={platform} />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
