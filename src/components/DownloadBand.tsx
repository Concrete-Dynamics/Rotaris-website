import { Link } from 'react-router-dom'
import { HOME_ANCHORS } from '../data/routes'
import type { ReleaseState } from '../hooks/useRelease'

/** Mid-page download access — DL-11 asks for the action to recur down the page. */
export default function DownloadBand({ release }: { release: ReleaseState }) {
  return (
    <div className="download-band">
      <div className="wrap">
        <strong>Free and MIT-licensed.</strong>
        <span className="band-note">
          No account required — download and point it at a repository.
        </span>
        <Link className="btn btn-primary btn-compact" to={HOME_ANCHORS.download}>
          <i className="ph ph-download-simple" aria-hidden="true" />
          {release.release.label}
        </Link>
      </div>
    </div>
  )
}
