import { Trans, useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { COMPANY_WEBSITE_URL, SECURITY_POLICY_URL } from '../data/release'
import { LEGAL_ROUTES } from '../data/routes'
import { useLocale, useLocalePath } from '../hooks/useLocalePath'
import { usePageMeta } from '../hooks/usePageMeta'

/**
 * Angaben gemäß § 5 DDG.
 *
 * Built from data rather than copied from a document, so the details stay in
 * one place. A few choices here are deliberate and should survive edits:
 *
 *   - § 5 Abs. 1 Nr. 6 DDG asks for the USt-IdNr., and only where one exists.
 *     A tax number is not a substitute and does not belong here.
 *   - The current provisions are § 5 DDG and § 18 Abs. 2 MStV.
 *   - "(haftungsbeschränkt)" must read exactly as registered (§ 5a Abs. 1
 *     GmbHG), in either language — it is part of the company name.
 *   - No data protection officer is named. None is required here, and naming a
 *     managing director would be a conflict under Art. 38(6) GDPR.
 *   - No link to the EU ODR platform, which closed on 20 July 2025. The § 36
 *     VSBG statement stands in its place.
 *
 * The wording follows the page language, as the documents in src/legal/ now do.
 * The German page carries the statutory notice; the English one states the same
 * facts for a reader who does not read German. The data below stays as
 * registered either way — a company name and a register entry are not
 * translated.
 */

const COMPANY = {
  name: 'Concrete Dynamics UG (haftungsbeschränkt)',
  street: 'Bahnhofstr. 15',
  city: '87435 Kempten (Allgäu)',
  directors: ['David Fischer', 'Philipp Geirhos'],
  court: 'Amtsgericht Kempten (Allgäu)',
  register: 'HRB 18115',
  email: 'info@concrete-dynamics.com',
  security: 'security@concrete-dynamics.com',
  phone: '+49 157 34796582',
}

const RELATED = [
  { key: 'privacy', to: LEGAL_ROUTES.privacy },
  { key: 'terms', to: LEGAL_ROUTES.terms },
  { key: 'eula', to: LEGAL_ROUTES.eula },
  { key: 'withdrawal', to: LEGAL_ROUTES.withdrawal },
  { key: 'acceptableUse', to: LEGAL_ROUTES.acceptableUse },
] as const

export default function Imprint() {
  const { t } = useTranslation('legal')
  const { t: tCommon } = useTranslation('common')
  const locale = useLocale()
  const localePath = useLocalePath()
  const companyUrl = COMPANY_WEBSITE_URL[locale]

  usePageMeta({ title: t('titles.imprint'), description: t('descriptions.imprint') })

  const directors = COMPANY.directors.join(t('imprint.labels.and'))

  return (
    <main className="legal">
      <div className="wrap">
        <Link to={localePath('/')} className="legal-back">
          <i className="ph ph-arrow-left" aria-hidden="true" />
          {t('back')}
        </Link>

        <h1 className="legal-title">{t('titles.imprint')}</h1>
        <p className="legal-german mono">{t('imprint.basis')}</p>

        <article className="legal-doc">
          <h2>{t('imprint.headings.provider')}</h2>
          <p>
            <a href={companyUrl}>{COMPANY.name}</a>
            <br />
            {COMPANY.street}
            <br />
            {COMPANY.city}
            <br />
            {t('imprint.labels.country')}
          </p>

          <h2>{t('imprint.headings.representedBy')}</h2>
          <p>{t('imprint.labels.directors', { directors })}</p>

          <h2>{t('imprint.headings.contact')}</h2>
          <p>
            {t('imprint.labels.email')}: <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
            <br />
            {t('imprint.labels.phone')}:{' '}
            <a href={`tel:${COMPANY.phone.replace(/\s/g, '')}`}>{COMPANY.phone}</a>
            <br />
            {t('imprint.labels.website')}: <a href={companyUrl}>{companyUrl}</a>
          </p>

          <h2>{t('imprint.headings.register')}</h2>
          <p>
            {t('imprint.labels.court')}: {COMPANY.court}
            <br />
            {t('imprint.labels.number')}: {COMPANY.register}
          </p>

          <h2>{t('imprint.headings.vat')}</h2>
          <p>
            <span className="legal-open">
              {t('draft.openLabel')} — {t('imprint.vatOpen')}
            </span>
          </p>

          <h2>{t('imprint.headings.responsible')}</h2>
          <p>
            {directors}
            <br />
            {t('imprint.labels.addressAsAbove')}
          </p>

          <h2>{t('imprint.headings.dataProtection')}</h2>
          <p>
            <Trans
              t={t}
              i18nKey="imprint.dataProtection"
              values={{ email: COMPANY.email }}
              components={[
                <a href={`mailto:${COMPANY.email}`} />,
                <Link to={localePath(LEGAL_ROUTES.privacy)} />,
              ]}
            />
          </p>

          <h2>{t('imprint.headings.disputes')}</h2>
          <p>{t('imprint.disputes')}</p>

          <h2>{t('imprint.headings.security')}</h2>
          <p>
            <Trans
              t={t}
              i18nKey="imprint.security"
              values={{ email: COMPANY.security }}
              components={[
                <a href={`mailto:${COMPANY.security}`} />,
                <a href={SECURITY_POLICY_URL} className="mono" />,
              ]}
            />
          </p>

          <h2>{t('imprint.headings.liability')}</h2>
          <p>{t('imprint.liability')}</p>
        </article>

        <div className="legal-related">
          <span className="card-kicker">{t('imprint.related')}</span>
          <div className="legal-related-links">
            {RELATED.map((item) => (
              <Link key={item.key} to={localePath(item.to)}>
                {tCommon(`footer.legal.${item.key}`)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
