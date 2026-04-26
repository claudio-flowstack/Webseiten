import { useLayoutEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useSeo } from '@/shared/seo/useSeo';

export function Datenschutz() {
  useSeo({
    title: 'Datenschutzerklärung · Flowstack System',
    description: 'Informationen zur Verarbeitung personenbezogener Daten bei Flowstack System nach DSGVO.',
    path: '/datenschutz',
    noindex: true,
  });

  useLayoutEffect(() => {
    document.body.style.backgroundColor = '#111415';
    document.body.style.color = '#f6f6f7';
    document.documentElement.classList.add('dark');
    document.body.style.margin = '0';
    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
      document.documentElement.classList.remove('dark');
    };
  }, []);

  const cardStyle = {
    background: 'rgba(24,26,27,0.5)',
    borderRadius: 12,
    padding: 32,
  };

  const sectionStyle = { marginBottom: 56 };
  const h2Style = { fontFamily: "'Inter Tight', 'Geist', sans-serif" as const, fontWeight: 800 as const, fontSize: 22, color: '#f6f6f7', marginBottom: 20, marginTop: 0, letterSpacing: '-0.02em' };
  const h3Style = { fontFamily: "'Inter Tight', 'Geist', sans-serif" as const, fontWeight: 800 as const, fontSize: 17, color: '#f6f6f7', marginBottom: 10, marginTop: 24, letterSpacing: '-0.01em' };
  const pStyle = { color: '#c4c5c7', fontWeight: 500 as const, lineHeight: 1.8, fontSize: 15, margin: '0 0 12px 0' };
  const linkStyle = { color: '#99f7ff', textDecoration: 'none' as const };
  const strongStyle = { color: '#f6f6f7', fontWeight: 700 as const };
  const ulStyle = { color: '#c4c5c7', fontWeight: 500 as const, lineHeight: 2, fontSize: 15, margin: '0 0 12px 0', paddingLeft: 20 };

  const accentLine = (
    <div style={{ width: 40, height: 3, background: '#99f7ff', marginBottom: 16, borderRadius: 2 }} />
  );

  return (
    <div className="legal-datenschutz" style={{ fontFamily: "'Inter Tight', 'Geist', sans-serif", minHeight: '100dvh', background: '#111415', backgroundImage: 'radial-gradient(ellipse at 20% 50%, rgba(0,241,254,0.03) 0%, transparent 60%)', color: '#f6f6f7', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        .legal-datenschutz .legal-header { padding: 14px 16px; }
        .legal-datenschutz .legal-main { padding: 48px 16px 64px; }
        .legal-datenschutz .legal-title { font-size: clamp(28px, 5vw, 40px); }
        .legal-datenschutz .legal-footer-links { gap: 16px; }
        .legal-datenschutz a:not(.legal-back-btn) { transition: text-decoration-color 0.2s, opacity 0.2s; }
        .legal-datenschutz a:not(.legal-back-btn):hover { text-decoration: underline; text-decoration-color: rgba(153,247,255,0.4); text-underline-offset: 3px; }
        @media (min-width: 768px) {
          .legal-datenschutz .legal-header { padding: 16px 24px; padding-bottom: 24px; }
          .legal-datenschutz .legal-main { padding: 88px 20px 88px; }
          .legal-datenschutz .legal-footer-links { gap: 24px; }
        }
      `}</style>

      {/* Header */}
      <header className="legal-header" style={{ background: 'rgba(42,44,46,0.6)', backdropFilter: 'blur(24px)', boxShadow: '0 1px 8px rgba(0,0,0,0.3)', position: 'sticky', top: 0, zIndex: 50, paddingTop: 'env(safe-area-inset-top)', paddingBottom: 24 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontFamily: "'Inter Tight', 'Geist', sans-serif", fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: '#f6f6f7' }}>
              Flow<span style={{ color: '#99f7ff' }}>stack</span>
            </span>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="legal-main" style={{ flex: 1, maxWidth: 720, margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <h1 className="legal-title" style={{ fontFamily: "'Inter Tight', 'Geist', sans-serif", fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, color: '#f6f6f7', marginTop: 0, marginBottom: 56 }}>
          Datenschutzerklärung
        </h1>

        {/* 1. Datenschutz auf einen Blick */}
        <section style={sectionStyle}>
          <div style={cardStyle}>
            {accentLine}
            <h2 style={h2Style}>1. Datenschutz auf einen Blick</h2>

            <h3 style={h3Style}>Allgemeine Hinweise</h3>
            <p style={pStyle}>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
            </p>

            <h3 style={h3Style}>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h3>
            <p style={pStyle}>
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber:<br />
              Claudio Di Franco, Flowstack Systems<br />
              Falkenweg 2, 76327 Pfinztal<br />
              E-Mail:{' '}
              <a href="mailto:info@flowstack.io" style={linkStyle}>info@flowstack.io</a>
            </p>

            <h3 style={h3Style}>Wie erfassen wir Ihre Daten?</h3>
            <p style={pStyle}>
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular, Bewerbungsformular oder Terminbuchungsformular eingeben.
            </p>
            <p style={pStyle}>
              Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.
            </p>

            <h3 style={h3Style}>Wofür nutzen wir Ihre Daten?</h3>
            <p style={pStyle}>
              Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden. Wenn Sie über unsere Formulare eine Anfrage stellen oder einen Termin buchen, nutzen wir Ihre Daten zur Bearbeitung Ihres Anliegens und zur Kontaktaufnahme.
            </p>

            <h3 style={h3Style}>Welche Rechte haben Sie bezüglich Ihrer Daten?</h3>
            <p style={pStyle}>
              Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
            </p>
            <p style={pStyle}>
              Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an uns wenden.
            </p>
          </div>
        </section>

        {/* 2. Hosting */}
        <section style={sectionStyle}>
          <div style={cardStyle}>
            {accentLine}
            <h2 style={h2Style}>2. Hosting</h2>

            <h3 style={h3Style}>Vercel</h3>
            <p style={pStyle}>
              Wir hosten unsere Website bei Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA. Wenn Sie unsere Website besuchen, werden Ihre personenbezogenen Daten auf den Servern von Vercel verarbeitet. Hierbei können auch personenbezogene Daten an den Mutterkonzern von Vercel in die USA übermittelt werden.
            </p>
            <p style={pStyle}>
              Vercel nutzt Server-Standorte in der Europäischen Union (Frankfurt, Deutschland). Damit wird sichergestellt, dass Ihre Daten vorrangig innerhalb der EU verarbeitet werden.
            </p>
            <p style={pStyle}>
              Die Verwendung von Vercel erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes Interesse an einer möglichst zuverlässigen Darstellung unserer Website. Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO.
            </p>

            <h3 style={h3Style}>Auftragsverarbeitung</h3>
            <p style={pStyle}>
              Wir haben einen Vertrag über Auftragsverarbeitung (AVV) zur Nutzung des oben genannten Dienstes geschlossen. Hierbei handelt es sich um einen datenschutzrechtlich vorgeschriebenen Vertrag, der gewährleistet, dass dieser die personenbezogenen Daten unserer Websitebesucher nur nach unseren Weisungen und unter Einhaltung der DSGVO verarbeitet.
            </p>
          </div>
        </section>

        {/* 3. Allgemeine Hinweise und Pflichtinformationen */}
        <section style={sectionStyle}>
          <div style={cardStyle}>
            {accentLine}
            <h2 style={h2Style}>3. Allgemeine Hinweise und Pflichtinformationen</h2>

            <h3 style={h3Style}>Datenschutz</h3>
            <p style={pStyle}>
              Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
            </p>
            <p style={pStyle}>
              Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.
            </p>
            <p style={pStyle}>
              Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.
            </p>

            <h3 style={h3Style}>Hinweis zur verantwortlichen Stelle</h3>
            <p style={pStyle}>
              Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
            </p>
            <p style={pStyle}>
              Claudio Di Franco<br />
              Flowstack Systems<br />
              Falkenweg 2<br />
              76327 Pfinztal<br /><br />
              E-Mail:{' '}
              <a href="mailto:info@flowstack.io" style={linkStyle}>info@flowstack.io</a>
            </p>
            <p style={pStyle}>
              Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen, E-Mail-Adressen o. Ä.) entscheidet.
            </p>

            <h3 style={h3Style}>Speicherdauer</h3>
            <p style={pStyle}>
              Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben (z. B. steuer- oder handelsrechtliche Aufbewahrungsfristen); im letztgenannten Fall erfolgt die Löschung nach Fortfall dieser Gründe.
            </p>

            <h3 style={h3Style}>Allgemeine Hinweise zu den Rechtsgrundlagen der Datenverarbeitung auf dieser Website</h3>
            <p style={pStyle}>
              Sofern Sie in die Datenverarbeitung eingewilligt haben, verarbeiten wir Ihre personenbezogenen Daten auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO bzw. Art. 9 Abs. 2 lit. a DSGVO, sofern besondere Datenkategorien nach Art. 9 Abs. 1 DSGVO verarbeitet werden. Im Falle einer ausdrücklichen Einwilligung in die Übertragung personenbezogener Daten in Drittstaaten erfolgt die Datenverarbeitung außerdem auf Grundlage von Art. 49 Abs. 1 lit. a DSGVO. Sofern Sie in die Speicherung von Cookies oder in den Zugriff auf Informationen in Ihr Endgerät (z. B. via Device-Fingerprinting) eingewilligt haben, erfolgt die Datenverarbeitung zusätzlich auf Grundlage von § 25 Abs. 1 TDDDG. Die Einwilligung ist jederzeit widerrufbar. Sind Ihre Daten zur Vertragserfüllung oder zur Durchführung vorvertraglicher Maßnahmen erforderlich, verarbeiten wir Ihre Daten auf Grundlage des Art. 6 Abs. 1 lit. b DSGVO. Des Weiteren verarbeiten wir Ihre Daten, sofern diese zur Erfüllung einer rechtlichen Verpflichtung erforderlich sind auf Grundlage von Art. 6 Abs. 1 lit. c DSGVO. Die Datenverarbeitung kann ferner auf Grundlage unseres berechtigten Interesses nach Art. 6 Abs. 1 lit. f DSGVO erfolgen. Über die jeweils im Einzelfall einschlägigen Rechtsgrundlagen wird in den folgenden Absätzen dieser Datenschutzerklärung informiert.
            </p>

            <h3 style={h3Style}>Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
            <p style={pStyle}>
              Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
            </p>

            <h3 style={h3Style}>Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen sowie gegen Direktwerbung (Art. 21 DSGVO)</h3>
            <p style={{ ...pStyle, padding: '16px', background: 'rgba(153,247,255,0.05)', borderLeft: '3px solid #99f7ff', borderRadius: '0 4px 4px 0' }}>
              <strong style={strongStyle}>
                Wenn die Datenverarbeitung auf Grundlage von Art. 6 Abs. 1 lit. e oder f DSGVO erfolgt, haben Sie jederzeit das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, gegen die Verarbeitung Ihrer personenbezogenen Daten Widerspruch einzulegen; dies gilt auch für ein auf diese Bestimmungen gestütztes Profiling. Die jeweilige Rechtsgrundlage, auf denen eine Verarbeitung beruht, entnehmen Sie dieser Datenschutzerklärung. Wenn Sie Widerspruch einlegen, werden wir Ihre betroffenen personenbezogenen Daten nicht mehr verarbeiten, es sei denn, wir können zwingende schutzwürdige Gründe für die Verarbeitung nachweisen, die Ihre Interessen, Rechte und Freiheiten überwiegen oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen (Widerspruch nach Art. 21 Abs. 1 DSGVO).
              </strong>
            </p>
            <p style={{ ...pStyle, padding: '16px', background: 'rgba(153,247,255,0.05)', borderLeft: '3px solid #99f7ff', borderRadius: '0 4px 4px 0', marginTop: 8 }}>
              <strong style={strongStyle}>
                Werden Ihre personenbezogenen Daten verarbeitet, um Direktwerbung zu betreiben, so haben Sie das Recht, jederzeit Widerspruch gegen die Verarbeitung Sie betreffender personenbezogener Daten zum Zwecke derartiger Werbung einzulegen; dies gilt auch für das Profiling, soweit es mit solcher Direktwerbung in Verbindung steht. Wenn Sie widersprechen, werden Ihre personenbezogenen Daten anschließend nicht mehr zum Zwecke der Direktwerbung verwendet (Widerspruch nach Art. 21 Abs. 2 DSGVO).
              </strong>
            </p>

            <h3 style={h3Style}>Beschwerderecht bei der zuständigen Aufsichtsbehörde</h3>
            <p style={pStyle}>
              Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbehörde zu, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes. Das Beschwerderecht besteht unbeschadet anderweitiger verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe.
            </p>
            <p style={pStyle}>
              Die für uns zuständige Aufsichtsbehörde ist:<br /><br />
              Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Baden-Württemberg<br />
              Lautenschlagerstraße 20<br />
              70173 Stuttgart<br />
              Telefon: +49 711 6155 41-0<br />
              E-Mail:{' '}
              <a href="mailto:poststelle@lfdi.bwl.de" style={linkStyle}>poststelle@lfdi.bwl.de</a><br />
              Website:{' '}
              <a href="https://www.baden-wuerttemberg.datenschutz.de" target="_blank" rel="noopener noreferrer" style={linkStyle}>
                https://www.baden-wuerttemberg.datenschutz.de
              </a>
            </p>

            <h3 style={h3Style}>Recht auf Datenübertragbarkeit</h3>
            <p style={pStyle}>
              Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format aushändigen zu lassen. Sofern Sie die direkte Übertragung der Daten an einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar ist.
            </p>

            <h3 style={h3Style}>Auskunft, Löschung und Berichtigung</h3>
            <p style={pStyle}>
              Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit an uns wenden.
            </p>

            <h3 style={h3Style}>Recht auf Einschränkung der Verarbeitung</h3>
            <p style={pStyle}>
              Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Hierzu können Sie sich jederzeit an uns wenden. Das Recht auf Einschränkung der Verarbeitung besteht in folgenden Fällen:
            </p>
            <ul style={ulStyle}>
              <li>Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten bestreiten, benötigen wir in der Regel Zeit, um dies zu überprüfen. Für die Dauer der Prüfung haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.</li>
              <li>Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig geschah/geschieht, können Sie statt der Löschung die Einschränkung der Datenverarbeitung verlangen.</li>
              <li>Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen, Sie sie jedoch zur Ausübung, Verteidigung oder Geltendmachung von Rechtsansprüchen benötigen, haben Sie das Recht, statt der Löschung die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.</li>
              <li>Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben, muss eine Abwägung zwischen Ihren und unseren Interessen vorgenommen werden. Solange noch nicht feststeht, wessen Interessen überwiegen, haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.</li>
            </ul>
            <p style={pStyle}>
              Wenn Sie die Verarbeitung Ihrer personenbezogenen Daten eingeschränkt haben, dürfen diese Daten (von ihrer Speicherung abgesehen) nur mit Ihrer Einwilligung oder zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen oder zum Schutz der Rechte einer anderen natürlichen oder juristischen Person oder aus Gründen eines wichtigen öffentlichen Interesses der Europäischen Union oder eines Mitgliedstaats verarbeitet werden.
            </p>

            <h3 style={h3Style}>SSL- bzw. TLS-Verschlüsselung</h3>
            <p style={pStyle}>
              Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://" auf „https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
            </p>
            <p style={pStyle}>
              Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.
            </p>
          </div>
        </section>

        {/* 4. Datenerfassung auf dieser Website */}
        <section style={sectionStyle}>
          <div style={cardStyle}>
            {accentLine}
            <h2 style={h2Style}>4. Datenerfassung auf dieser Website</h2>

            <h3 style={h3Style}>Cookies</h3>
            <p style={pStyle}>
              Unsere Internetseiten verwenden so genannte „Cookies". Cookies sind kleine Datenpakete und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert. Session-Cookies werden nach Ende Ihres Besuchs automatisch gelöscht. Permanente Cookies bleiben auf Ihrem Endgerät gespeichert, bis Sie diese selbst löschen oder eine automatische Löschung durch Ihren Webbrowser erfolgt.
            </p>
            <p style={pStyle}>
              Diese Website verwendet ausschließlich technisch notwendige Cookies, die für den Betrieb der Seite erforderlich sind. Optionale Cookies für Analyse- oder Marketingzwecke werden nur mit Ihrer ausdrücklichen Einwilligung über unseren Cookie-Banner gesetzt.
            </p>
            <p style={pStyle}>
              Technisch notwendige Cookies werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO gespeichert. Der Websitebetreiber hat ein berechtigtes Interesse an der Speicherung von technisch notwendigen Cookies zur technisch fehlerfreien und optimierten Bereitstellung seiner Dienste. Sofern eine Einwilligung zur Speicherung von Cookies und vergleichbaren Wiedererkennungstechnologien abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage dieser Einwilligung (Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG); die Einwilligung ist jederzeit widerrufbar.
            </p>

            <h3 style={h3Style}>Server-Log-Dateien</h3>
            <p style={pStyle}>
              Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
            </p>
            <ul style={ulStyle}>
              <li>Browsertyp und Browserversion</li>
              <li>verwendetes Betriebssystem</li>
              <li>Referrer URL</li>
              <li>Hostname des zugreifenden Rechners</li>
              <li>Uhrzeit der Serveranfrage</li>
              <li>IP-Adresse</li>
            </ul>
            <p style={pStyle}>
              Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der technisch fehlerfreien Darstellung und der Optimierung seiner Website. Hierzu müssen die Server-Log-Dateien erfasst werden.
            </p>

            <h3 style={h3Style}>Opt-in Formular (Kontaktformular)</h3>
            <p style={pStyle}>
              Wenn Sie uns über unser Opt-in Formular kontaktieren, werden folgende Daten erhoben:
            </p>
            <ul style={ulStyle}>
              <li>Vorname</li>
              <li>E-Mail-Adresse</li>
              <li>Telefonnummer</li>
            </ul>
            <p style={pStyle}>
              Diese Daten werden zum Zweck der Kontaktaufnahme und zur Bearbeitung Ihrer Anfrage verarbeitet. Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO (Einwilligung) sowie Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen). Die von Ihnen im Formular eingegebenen Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt. Zwingende gesetzliche Bestimmungen, insbesondere Aufbewahrungsfristen, bleiben unberührt.
            </p>

            <h3 style={h3Style}>Bewerbungsformular (Multi-Step)</h3>
            <p style={pStyle}>
              Über unser mehrstufiges Bewerbungsformular werden folgende Daten erhoben:
            </p>
            <ul style={ulStyle}>
              <li>Anrede</li>
              <li>Vorname und Nachname</li>
              <li>E-Mail-Adresse</li>
              <li>Telefonnummer</li>
              <li>Website</li>
              <li>Unternehmensart</li>
              <li>Umsatz</li>
              <li>Ziele</li>
              <li>Probleme</li>
              <li>Aktuelle Werbemaßnahmen</li>
              <li>Anzahl Mitarbeiter</li>
              <li>Investitionsbereitschaft</li>
              <li>Freitext (offene Nachricht)</li>
            </ul>
            <p style={pStyle}>
              Diese Daten werden ausschließlich zur Qualifizierung und Bearbeitung Ihrer Anfrage sowie zur Vorbereitung eines möglichen Beratungsgesprächs verwendet. Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO (Einwilligung durch aktives Absenden des Formulars) sowie Art. 6 Abs. 1 lit. b DSGVO (Durchführung vorvertraglicher Maßnahmen). Die Daten werden gelöscht, sobald sie für die Erreichung des Zweckes ihrer Erhebung nicht mehr erforderlich sind und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
            </p>

            <h3 style={h3Style}>Terminbuchung</h3>
            <p style={pStyle}>
              Bei der Buchung eines Beratungstermins werden folgende Daten erhoben:
            </p>
            <ul style={ulStyle}>
              <li>Vorname und Nachname</li>
              <li>E-Mail-Adresse</li>
              <li>Handynummer</li>
              <li>Anmerkung (optionales Freitextfeld)</li>
            </ul>
            <p style={pStyle}>
              Die Verarbeitung erfolgt zur Durchführung vorvertraglicher Maßnahmen auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO. Die Daten werden zur Terminkoordination und Vorbereitung des Gesprächs genutzt und nach Wegfall des Verarbeitungszwecks gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten bestehen.
            </p>
          </div>
        </section>

        {/* 5. Analyse-Tools und Werbung */}
        <section style={sectionStyle}>
          <div style={cardStyle}>
            {accentLine}
            <h2 style={h2Style}>5. Analyse-Tools und Werbung</h2>

            <h3 style={h3Style}>Umami Analytics</h3>
            <p style={pStyle}>
              Diese Website nutzt Umami Analytics, ein datenschutzfreundliches, Open-Source-Webanalyse-Tool. Umami erhebt keine personenbezogenen Daten, verwendet keine Cookies und speichert keine Informationen auf Ihrem Endgerät. Die Daten werden auf EU-Servern verarbeitet. Es werden lediglich anonymisierte Nutzungsstatistiken erfasst (z. B. Seitenaufrufe, Verweildauer, Herkunftsland). Eine Identifizierung einzelner Nutzer ist nicht möglich.
            </p>
            <p style={pStyle}>
              Die Nutzung von Umami Analytics erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes Interesse an der anonymisierten Analyse des Nutzerverhaltens, um unser Webangebot zu optimieren. Da keine personenbezogenen Daten erhoben werden und keine Cookies gesetzt werden, ist keine Einwilligung nach § 25 TDDDG erforderlich.
            </p>

            <h3 style={h3Style}>Google Tag Manager</h3>
            <p style={pStyle}>
              Wir nutzen den Google Tag Manager (GTM-MSKQHK3T) zur Verwaltung von Website-Tags. Der Google Tag Manager selbst speichert keine personenbezogenen Daten und setzt keine Cookies. Er dient als technische Plattform, über die andere Dienste (z. B. Analyse- und Marketing-Tools) eingebunden und gesteuert werden. Die über den Tag Manager ausgelösten Dienste können jedoch eigenständig Daten erfassen. Anbieter ist Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.
            </p>
            <p style={pStyle}>
              Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der effizienten Verwaltung von Website-Tags).
            </p>

            <h3 style={h3Style}>Meta Pixel (Facebook)</h3>
            <p style={pStyle}>
              Bei erteilter Einwilligung nutzen wir das Meta Pixel zur Messung der Wirksamkeit unserer Werbeanzeigen auf Facebook und Instagram. Das Pixel wird erst nach Ihrer Zustimmung über den Cookie-Banner aktiviert. Dabei werden Daten wie Ihre IP-Adresse, besuchte Seiten und durchgeführte Aktionen an Meta Platforms Ireland Limited, 4 Grand Canal Square, Dublin 2, Irland übermittelt. Meta kann diese Informationen mit Ihrem Facebook- oder Instagram-Konto verknüpfen.
            </p>
            <p style={pStyle}>
              Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung über Cookie-Banner). Sie können Ihre Einwilligung jederzeit widerrufen.
            </p>

            <h3 style={h3Style}>Google Calendar API</h3>
            <p style={pStyle}>
              Für die Terminbuchung nutzen wir die Google Calendar API, um verfügbare Zeitslots anzuzeigen und Termine zu erstellen. Dabei werden Ihr Name, Ihre E-Mail-Adresse und Ihre Telefonnummer an Google Calendar übermittelt. Anbieter ist Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.
            </p>
            <p style={pStyle}>
              Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Durchführung vorvertraglicher Maßnahmen auf Ihre Anfrage hin).
            </p>

            <h3 style={h3Style}>Google Fonts</h3>
            <p style={pStyle}>
              Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten so genannte Google Fonts, die über das Google Fonts CDN eingebunden werden. Beim Aufruf einer Seite lädt Ihr Browser die benötigten Schriftarten direkt von Googles Servern. Dabei wird Ihre IP-Adresse an Google übermittelt. Anbieter ist Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.
            </p>
            <p style={pStyle}>
              Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer einheitlichen Darstellung der Schriftarten).
            </p>
          </div>
        </section>

        {/* 6. Auftragsverarbeitung */}
        <section style={sectionStyle}>
          <div style={cardStyle}>
            {accentLine}
            <h2 style={h2Style}>6. Auftragsverarbeitung und Drittanbieter</h2>

            <h3 style={h3Style}>Google Ireland Limited (Google Sheets, Gmail API)</h3>
            <p style={pStyle}>
              Zur Verarbeitung und Speicherung von Formulardaten nutzen wir Google Sheets sowie die Gmail API für E-Mail-Benachrichtigungen. Anbieter ist Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.
            </p>
            <p style={pStyle}>
              Die über unsere Formulare erhobenen Daten (Kontaktdaten, Bewerbungsdaten, Terminbuchungen) werden in Google Sheets gespeichert und über die Gmail API als E-Mail-Benachrichtigung an uns weitergeleitet. Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung/vorvertragliche Maßnahmen) bzw. Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).
            </p>
            <p style={pStyle}>
              Wir haben mit Google einen Vertrag über Auftragsverarbeitung (AVV) geschlossen. Google verarbeitet die Daten in unserem Auftrag und darf sie nicht für eigene Zwecke nutzen.
            </p>

            <h3 style={h3Style}>Vercel Inc. (Hosting)</h3>
            <p style={pStyle}>
              Details zum Hosting durch Vercel finden Sie im Abschnitt „2. Hosting" dieser Datenschutzerklärung.
            </p>
          </div>
        </section>

        {/* 7. Datenübermittlung in Drittländer */}
        <section style={sectionStyle}>
          <div style={cardStyle}>
            {accentLine}
            <h2 style={h2Style}>7. Datenübermittlung in Drittländer</h2>
            <p style={pStyle}>
              Wir nutzen unter anderem Tools von Unternehmen mit Sitz in den USA (Vercel Inc., Google LLC als Mutterkonzern von Google Ireland Limited). Wenn diese Tools aktiv sind, können Ihre personenbezogenen Daten in die USA übertragen werden.
            </p>
            <p style={pStyle}>
              Die USA werden vom Europäischen Gerichtshof als ein Land mit einem nach EU-Standards unzureichenden Datenschutzniveau eingestuft. Seit dem 10. Juli 2023 besteht jedoch das EU-US Data Privacy Framework, das für zertifizierte US-Unternehmen ein angemessenes Datenschutzniveau feststellt. Sowohl Google als auch Vercel sind unter dem EU-US Data Privacy Framework zertifiziert.
            </p>
            <p style={pStyle}>
              Die Datenübermittlung erfolgt auf Grundlage von Art. 45 DSGVO (Angemessenheitsbeschluss) bzw. auf Grundlage von Standardvertragsklauseln (Art. 46 Abs. 2 lit. c DSGVO) als ergänzende Schutzmaßnahme.
            </p>
          </div>
        </section>

        {/* 8. Ihre Rechte im Überblick */}
        <section style={sectionStyle}>
          <div style={cardStyle}>
            {accentLine}
            <h2 style={h2Style}>8. Ihre Rechte im Überblick</h2>
            <p style={pStyle}>
              Als betroffene Person haben Sie folgende Rechte:
            </p>
            <ul style={{ ...ulStyle, lineHeight: 2.2 }}>
              <li><strong style={strongStyle}>Recht auf Auskunft (Art. 15 DSGVO)</strong> &ndash; Sie können Auskunft darüber verlangen, ob und welche personenbezogenen Daten wir von Ihnen verarbeiten.</li>
              <li><strong style={strongStyle}>Recht auf Berichtigung (Art. 16 DSGVO)</strong> &ndash; Sie können die Berichtigung unrichtiger oder die Vervollständigung unvollständiger Daten verlangen.</li>
              <li><strong style={strongStyle}>Recht auf Löschung (Art. 17 DSGVO)</strong> &ndash; Sie können die Löschung Ihrer personenbezogenen Daten verlangen, sofern die Voraussetzungen des Art. 17 DSGVO erfüllt sind.</li>
              <li><strong style={strongStyle}>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</strong> &ndash; Sie können unter bestimmten Voraussetzungen verlangen, dass die Verarbeitung Ihrer Daten eingeschränkt wird.</li>
              <li><strong style={strongStyle}>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</strong> &ndash; Sie können verlangen, dass wir Ihnen Ihre Daten in einem strukturierten, gängigen und maschinenlesbaren Format zur Verfügung stellen.</li>
              <li><strong style={strongStyle}>Widerspruchsrecht (Art. 21 DSGVO)</strong> &ndash; Sie können der Verarbeitung Ihrer Daten jederzeit widersprechen, sofern die Verarbeitung auf Art. 6 Abs. 1 lit. e oder f DSGVO beruht.</li>
            </ul>
            <p style={pStyle}>
              Zur Ausübung Ihrer Rechte genügt eine formlose Mitteilung an{' '}
              <a href="mailto:info@flowstack.io" style={linkStyle}>info@flowstack.io</a>. Wir werden Ihrem Anliegen unverzüglich, spätestens jedoch innerhalb eines Monats nachkommen.
            </p>
          </div>
        </section>

        {/* 9. Aktualität */}
        <section style={sectionStyle}>
          <div style={cardStyle}>
            {accentLine}
            <h2 style={h2Style}>9. Aktualität und Änderung dieser Datenschutzerklärung</h2>
            <p style={pStyle}>
              Diese Datenschutzerklärung ist aktuell gültig und hat den Stand April 2026.
            </p>
            <p style={pStyle}>
              Durch die Weiterentwicklung unserer Website und Angebote darüber oder aufgrund geänderter gesetzlicher bzw. behördlicher Vorgaben kann es notwendig werden, diese Datenschutzerklärung zu ändern. Die jeweils aktuelle Datenschutzerklärung kann jederzeit auf dieser Website abgerufen und ausgedruckt werden.
            </p>
          </div>
        </section>

        {/* Zurück-Link */}
        <div style={{ marginTop: 16, paddingTop: 32, borderTop: '1px solid rgba(196,197,199,0.1)', display: 'flex', justifyContent: 'flex-start' }}>
          <a
            className="legal-back-btn"
            href="/kostenloses-videotraining"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#99f7ff', textDecoration: 'none', fontSize: 15, fontWeight: 700, fontFamily: "'Inter Tight', 'Geist', sans-serif", transition: 'background 0.2s, border-color 0.2s', border: '1px solid rgba(70,72,73,0.2)', padding: '12px 24px', borderRadius: 4 }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(153,247,255,0.05)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(153,247,255,0.2)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(70,72,73,0.2)'; }}
          >
            <ArrowLeft style={{ width: 16, height: 16 }} />
            Zurück
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ padding: '32px 24px', background: '#111415' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center' }}>
          <div className="legal-footer-links" style={{ display: 'flex', fontSize: 12, color: '#c4c5c7' }}>
            <a href="/impressum" target="_blank" rel="noopener noreferrer" style={{ color: '#c4c5c7', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => { (e.target as HTMLAnchorElement).style.color = '#99f7ff'; }} onMouseLeave={(e) => { (e.target as HTMLAnchorElement).style.color = '#c4c5c7'; }}>Impressum</a>
            <a href="/datenschutz" target="_blank" rel="noopener noreferrer" style={{ color: '#c4c5c7', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => { (e.target as HTMLAnchorElement).style.color = '#99f7ff'; }} onMouseLeave={(e) => { (e.target as HTMLAnchorElement).style.color = '#c4c5c7'; }}>Datenschutz</a>
          </div>
          <p style={{ fontSize: 11, color: '#9ca3af', maxWidth: 600, lineHeight: 1.5, fontWeight: 500 }}>
            Diese Website ist nicht Teil der Facebook-Website oder von Facebook Inc. Diese Seite ist NICHT im Auftrag der FACEBOOK, Inc. entstanden. FACEBOOK ist eine Marke von FACEBOOK, Inc.
          </p>
          <p style={{ fontSize: 11, color: '#9ca3af', fontWeight: 500 }}>&copy; 2026 Flowstack. Alle Rechte vorbehalten.</p>
        </div>
      </footer>
    </div>
  );
}
