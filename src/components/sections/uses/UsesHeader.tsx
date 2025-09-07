import { Badge } from "@/components/ui/badge"


export default function UsesHeader () {
    return (
    <section className="pt-40 pb-32 relative pattern">

        <div className="container-custom max-w-4xl relative">

          <div className="text-center space-y-6 z-1 relative">
            <h3 className="text-4xl md:text-5xl font-light text-white">
              Tools & Setup
            </h3>
            <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
              The essential tools and technologies that power my daily work and creative process.
            </p>

            <div className="mx-auto w-fit mt-6 flex flex-wrap justify-center gap-2">
              {
                ["Frontend & Backend", "Design & Productivity", "Developer Experience"].map(
                  (v, idx) => {
                    return (
                      <Badge variant="secondary" key={idx}>{v}</Badge>
                    )
                  }
                )
              }
             </div>
          </div>
        </div>

      </section>
    )
}