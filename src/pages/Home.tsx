import { useTranslation } from 'react-i18next'
import DownloadHero from '../components/DownloadHero'
import ProductDefinition from '../components/ProductDefinition'
import HowItWorks from '../components/HowItWorks'
import SixViews from '../components/SixViews'
import Orchestration from '../components/Orchestration'
import Verification from '../components/Verification'
import DownloadBand from '../components/DownloadBand'
import ControlObservability from '../components/ControlObservability'
import ModelsProviders from '../components/ModelsProviders'
import Security from '../components/Security'
import GitWorkflow from '../components/GitWorkflow'
import OpenSource from '../components/OpenSource'
import Faq from '../components/Faq'
import FinalDownload from '../components/FinalDownload'
import type { ReleaseState } from '../hooks/useRelease'
import { usePageMeta } from '../hooks/usePageMeta'

export default function Home({ release }: { release: ReleaseState }) {
  const { t } = useTranslation('common')

  // No title override: the homepage title is the site title.
  usePageMeta({ description: t('meta.home.description') })

  return (
    <main>
      <DownloadHero release={release} />
      <ProductDefinition />
      <HowItWorks />
      <SixViews />
      <Orchestration />
      <Verification />
      <DownloadBand release={release} />
      <ControlObservability />
      <ModelsProviders />
      <Security />
      <GitWorkflow />
      <OpenSource release={release} />
      <Faq />
      <FinalDownload release={release} />
    </main>
  )
}
