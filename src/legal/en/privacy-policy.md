# Privacy policy for Rotaris and Rotaris Cloud

As of 21 August 2026

This statement applies to the Rotaris desktop application, the command-line and terminal
interfaces, and to the paid **Rotaris Cloud** service. Our website is covered by the
separate privacy statement published there.

## 1. Controller

Concrete Dynamics UG (haftungsbeschränkt)
Bahnhofstr. 15, 87435 Kempten (Allgäu), Germany
Represented by the managing directors David Fischer and Philipp Geirhos
Register court: Kempten (Allgäu) local court, HRB 18115
Email: info@concrete-dynamics.com
Phone: +49 157 34796582

We have not appointed a data protection officer; the statutory conditions of Art. 37
GDPR and § 38 BDSG are not met in our case. For data protection enquiries you can reach
us at the address above.

## 2. First things first: Rotaris works locally

Rotaris runs on your machine and works in your working directory. Your project files,
the complete session transcripts, diagnostic logs, the response cache and the Git
worktrees created by Rotaris are stored locally and nowhere else:

- `<working directory>/.rotaris/` — sessions, logs, cache, worktrees
- `~/.config/rotaris/` — global configuration
- `~/.local/share/rotaris/tokens/` — credentials, file-based with `0600` permissions

We have no access to this data. It leaves your machine only in the cases described in
section 4 — and then only because you give a task to a language model or expressly send
us something.

**Your responsibility for content.** What you hand to a language model is your decision.
If your source files, logs or task descriptions contain third parties' personal data,
you are the one responsible for that processing under data protection law. For business
use we will provide you with a data processing agreement under Art. 28 GDPR on request.

## 3. Registration and user account (Rotaris Cloud only)

You can use the Rotaris application itself without an account. For Rotaris Cloud you
create an account. In doing so we process:

| Data | Purpose |
| --- | --- |
| Email address | Sign-in, account recovery, service-related messages |
| Password (only as a cryptographic hash, never in clear text) | Authentication |
| Time of registration, account status | Contract administration |

Sign-in runs through our own Keycloak server using the standard OpenID Connect procedure
(authorization code flow with PKCE). The server sits on a virtual server operated by us
at Contabo GmbH in Germany.

The legal basis is Art. 6(1)(b) GDPR (performance of the user contract).

## 4. Processing when using Rotaris Cloud

### 4.1 Model requests

If you choose Rotaris Cloud as the provider, the application sends your request to
`https://rotaris.ai/v1`. A request consists of what the agent needs for the task: task
text, excerpts from your source files, output from commands that were run and results
from earlier steps.

**We do not store the contents of these requests.** Our server accepts the request,
forwards it to OpenRouter, Inc., returns the response and keeps only as much of it as
billing requires (see 4.2). Neither the request nor the response is permanently stored,
logged or inspected by us.

OpenRouter, Inc. (USA) forwards the request to the provider of the respective model.
This means a transfer to the United States takes place; the basis and the safeguards for
it are set out in section 7.

The legal basis is Art. 6(1)(b) GDPR.

### 4.2 Credit, consumption and payment

Rotaris Cloud is billed against credit purchased in advance. For this we process, per
account, the credit balance, the consumption entries (time, model used, tokens consumed,
amount) and the purchase and payment transactions. The consumption record contains no
content from your requests. [CHECK: verify the backend's exact accounting record and
align this list with it.]

Payments are handled by Stripe Payments Europe, Ltd., Dublin, Ireland. You enter your
payment details — card details, bank details — directly with Stripe; we do not receive
them, only the confirmation of payment and the information needed for the invoice.
Stripe's privacy policy applies in addition.

The legal basis is Art. 6(1)(b) GDPR, and for the retention of invoice data Art. 6(1)(c)
GDPR in conjunction with § 147 AO and § 257 HGB.

### 4.3 Server logs

On access, our servers log the IP address, the time, the requested path, the status code
and the amount of data transferred. This serves operation and the defence against
attacks. The logs are deleted after 7 days. [CHECK: configure the actual retention period
on the VPS and enter it here.]

The legal basis is Art. 6(1)(f) GDPR; our legitimate interest is the secure and
undisturbed operation of the service.

## 5. Processing independent of Rotaris Cloud

### 5.1 Update check

Installed Rotaris versions ask GitHub at start-up whether a newer version is available
(`api.github.com`). In doing so, GitHub learns your IP address and the technical details
of your program. We do not receive this data. No such request is made from a source
installation.

Rotaris installs a downloaded update only if the file's checksum matches the published
checksum.

The legal basis is Art. 6(1)(f) GDPR; our legitimate interest is that you receive
security updates promptly. You can switch the check off in the settings. [CHECK: does the
switch exist? If not, it has to be added before publication — otherwise delete this
sentence.]

### 5.2 Other model providers of your choice

Instead of Rotaris Cloud, Rotaris can also address Anthropic, OpenAI, DeepSeek, GitHub
Copilot, OpenAI Codex or any OpenAI-compatible endpoint. In that case the connection is
directly between your machine and the provider you chose. We are not involved in it,
receive no data and are not responsible for it. Solely your agreement with the
respective provider and their privacy policy apply.

The same goes for MCP servers you set up yourself, such as web search via Tavily: such
connections exist only because you configured them.

### 5.3 Support and feedback

If you write to us by email, we process the information you give in order to deal with
your request, on the basis of Art. 6(1)(b) or (f) GDPR, and delete it as soon as
retention is no longer necessary.

## 6. Recipients

We pass personal data only to the following service providers, who act for us as
processors under Art. 28 GDPR or act on their own responsibility as payment service
providers:

| Recipient | Task | Location |
| --- | --- | --- |
| Contabo GmbH, Munich | Server infrastructure (hosting) | Germany |
| OpenRouter, Inc., Delaware | Forwarding of model requests | USA |
| Stripe Payments Europe, Ltd., Dublin | Payment processing | Ireland / USA |
| GitHub, Inc. | Delivery of program updates | USA |

Beyond that, we pass on data where we are legally obliged to do so.

## 7. Transfers to third countries

The forwarding of model requests to OpenRouter, as well as payment processing and the
delivery of updates, touch the United States. The transfer is based on the European
Commission's standard contractual clauses under Art. 46(2)(c) GDPR, in so far as the
recipient is not certified under the EU-US Data Privacy Framework (Art. 45 GDPR). We
will send you a copy of the safeguards on request.

[CHECK: before publication, document for OpenRouter the concluded processing agreement
including standard contractual clauses and the certification status; for Stripe, the DPF
certification of Stripe, Inc.]

## 8. Retention

We delete account data when you delete your account. Invoice and accounting data are
retained for 10 years because of commercial and tax law obligations, and blocked for
other purposes during that time. Server logs are deleted after 7 days. The details are
set out in our internal deletion policy.

## 9. Your rights

You have the right of access (Art. 15), rectification (Art. 16), erasure (Art. 17),
restriction of processing (Art. 18), data portability (Art. 20) and objection to
processing based on legitimate interests (Art. 21). You may withdraw consent you have
given at any time with effect for the future.

To do so, contact info@concrete-dynamics.com. We reply within one month.

You can also complain to a supervisory authority. The authority responsible for us is
the Bavarian Data Protection Supervisory Authority (Bayerisches Landesamt für
Datenschutzaufsicht), Promenade 27, 91522 Ansbach.

## 10. No automated decision-making

Automated decision-making including profiling within the meaning of Art. 22 GDPR does not
take place. Language model output consists of suggestions for your task, not decisions
about you.

## 11. Changes

We adapt this statement when the application or the legal situation changes. The version
in force at any time is available at [ENTER URL]; the date above states its status.
