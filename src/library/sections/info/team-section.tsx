/**
 * @baustein Team Section
 * @zweck Teammitglieder-Cards mit Foto, Name, Rolle, Bio
 * @geeignet-fuer Über uns, Team, Gründer-Vorstellung
 * @stil Dark Theme, Photo + Content Side-by-Side, Purple Glow
 */

interface TeamMember {
  name: string
  role: string
  bio: string
  image: string
}

interface TeamSectionProps {
  badge?: string
  headline?: string
  members: TeamMember[]
}

export function TeamSection({
  badge = "Über uns",
  headline = "Die Köpfe hinter dem Projekt",
  members,
}: TeamSectionProps) {
  return (
    <section className="py-24 bg-gray-900/30">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          {badge && <span className="inline-block px-4 py-2 bg-purple-500/10 text-purple-400 rounded-full text-sm font-semibold mb-4 border border-purple-500/20">{badge}</span>}
          <h2 className="text-3xl md:text-4xl font-bold text-white">{headline}</h2>
        </div>

        <div className="space-y-12">
          {members.map((member, i) => (
            <div key={i} className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-purple-600/10 rounded-3xl blur-xl opacity-50" />
              <div className="relative bg-[#0a0a0e] rounded-2xl border border-gray-800/50 p-8 md:p-10">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="absolute -inset-2 bg-gradient-to-br from-purple-500/30 to-purple-600/10 rounded-2xl blur-lg" />
                      <img src={member.image} alt={member.name} loading="lazy" className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover object-top ring-2 ring-purple-500/30" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-purple-400 font-medium mb-6">{member.role}</p>
                    <div className="text-gray-400 leading-relaxed space-y-4">
                      {member.bio.split("\n\n").map((p, j) => (
                        <p key={j}>{p}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
