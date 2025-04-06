import Linkedin from "@components/icons/Linkedin"
import Github from "@components/icons/Github"
import Youtube from "@components/icons/Youtube"

export default function SocialIcon({ name, className }) {
  return name === 'youtube' ? <Youtube className={className} />
    : name === 'linkedin' ? <Linkedin className={className} />
      : name === 'github' ? <Github className={className} /> : ''
}