# 🌙 KATCODED · DARK MAGICAL

## 🎨 Farben

### Kernpalette · v0.1

Diese sechs Farben bilden die Standardpalette von **Dark Magical**.
Sie entstanden ursprünglich in Vaelira und wurden später für katcoded.de
übernommen und weiterentwickelt.

| Rolle                | Name           | Hex       |
| -------------------- | -------------- | --------- |
| Hintergrund          | Deep Plum      | `#21152b` |
| Oberfläche           | Raised Plum    | `#2b1b38` |
| Primärakzent / Wärme | Arcane Gold    | `#d8c6a3` |
| Magischer Akzent     | Arcane Purple  | `#5c3d70` |
| Text                 | Soft Light     | `#f4edf8` |
| Sekundärer Text      | Muted Lavender | `#b9a9c1` |

### Farbrollen

- **Deep Plum** ist der Standard-Hintergrund der Anwendung.
- **Raised Plum** hebt Cards, Sections und andere Flächen vom Hintergrund ab.
- **Arcane Gold** ist der warme Hauptakzent für wichtige Interaktionen und besondere Elemente.
- **Arcane Purple** trägt die magische Ebene und eignet sich für Borders, Tiefe, Glows und sekundäre Akzente.
- **Soft Light** ist die Standardfarbe für gut lesbaren Haupttext.
- **Muted Lavender** ist für sekundäre und bewusst zurückgenommene Informationen gedacht.

## 🔤 Typografie

### Schriftfamilien · v0.1

Dark Magical kombiniert eine charaktervolle Serifenschrift mit einer ruhigen,
gut lesbaren Sans-Serif-Schrift.

| Rolle                   | Schrift                |
| ----------------------- | ---------------------- |
| Display / Überschriften | **EB Garamond**        |
| Fließtext / UI          | **Noto Sans**          |
| Atmosphärische Akzente  | **EB Garamond Italic** |

**EB Garamond** trägt den magischen, literarischen Charakter des Styles.
Sie wird für große Titel, besondere Überschriften und atmosphärische Elemente verwendet.

**Noto Sans** übernimmt die funktionale Ebene des Interfaces.
Sie wird für gut lesbaren Fließtext sowie Navigation, Buttons, Labels und andere UI-Elemente verwendet.

**EB Garamond Italic** darf sparsam für Taglines, kleine atmosphärische Texte
und besondere Akzente eingesetzt werden.

### Typografische Hierarchie · v0.1

Die Typografie von Dark Magical trennt atmosphärische Überschriften klar von
funktionalen und längeren Texten. Große Texte dürfen Charakter zeigen,
während kleinere Texte vor allem ruhig und gut lesbar bleiben.

| Ebene                  | Schrift            | Größe      | Zeilenhöhe |
| ---------------------- | ------------------ | ---------- | ---------- |
| H1 · Seitentitel       | EB Garamond        | `2.75rem`  | `1.2`      |
| H2 · Abschnitt         | EB Garamond        | `1.75rem`  | `1.3`      |
| H3 · Card-Titel        | EB Garamond        | `1.25rem`  | `1.4`      |
| H4 · Untertitel        | Noto Sans          | `1rem`     | `1.4`      |
| Fließtext              | Noto Sans          | `1rem`     | `1.6`      |
| Atmosphärischer Akzent | EB Garamond Italic | `1.1rem`   | `1.6`      |
| Kleiner Text / Hinweis | Noto Sans          | `0.875rem` | `1.5`      |

Die Hierarchie ist als Standard gedacht, nicht als starres Gesetz.
Besondere Hero-Bereiche oder dekorative Titel dürfen bei Bedarf größer werden,
solange die Informationshierarchie klar bleibt.

## 📐 Abstände

### Spacing-Prinzip · v0.1

Dark Magical verwendet großzügige, aber nicht übermäßig weite Abstände.
Die Oberfläche soll ruhig und gemütlich wirken, ohne unnötig viel Platz
zwischen zusammengehörigen Informationen zu erzeugen.

Zusammengehörige Elemente stehen näher beieinander.
Unterschiedliche Bereiche werden durch deutlich größere Abstände voneinander getrennt.

### Spacing-Skala · v0.1

| Token | Größe     | Verwendung                               |
| ----- | --------- | ---------------------------------------- |
| 2XS   | `0.25rem` | Sehr feine Abstände                      |
| XS    | `0.5rem`  | Kleine Abstände, z. B. Icon + Text       |
| SM    | `0.75rem` | Zusammengehörige Elemente                |
| MD    | `1rem`    | Standardabstand und Card-Padding         |
| LG    | `1.5rem`  | Abstand zwischen größeren Elementen      |
| XL    | `2rem`    | Größere Bereiche und Sections            |
| 2XL   | `3rem`    | Deutliche Trennung großer Seitenbereiche |

Die Skala ist ein Standard, kein starres Raster.
Abstände sollen vor allem sichtbar machen, welche Inhalte zusammengehören.

## ◯ Ecken & Rundungen

### Radius-Prinzip · v0.1

Dark Magical kombiniert weich gerundete größere Flächen mit etwas
zurückhaltender gerundeten funktionalen UI-Elementen.

Cards, größere Flächen und Bilder dürfen deutlich weich und cozy wirken.
Buttons, Inputs und kleinere UI-Elemente bleiben etwas klarer und strukturierter.
Tags und Badges dürfen vollständig pillenförmig sein.

| Element                      | Radius    |
| ---------------------------- | --------- |
| Cards / größere Flächen      | `1.5rem`  |
| Bilder                       | `1.5rem`  |
| Buttons                      | `0.75rem` |
| Inputs / kleinere UI-Flächen | `0.75rem` |
| Tags / Badges                | Pill      |

Die unterschiedlichen Radien sind bewusst gewählt:
Große visuelle Flächen dürfen weicher wirken, während funktionale Elemente
ihre klarere Form behalten.

## ✦ Rahmen & Interaktionszustände

### Border-Prinzip · v0.1

Dark Magical verwendet Rahmen nicht nur zur Abgrenzung, sondern auch als
Teil des visuellen Feedbacks.

Im Ruhezustand bleiben Rahmen dezent und überwiegend violett.
Interaktion lässt die magische Ebene sichtbarer werden.
Gold ist besonderen, fokussierten oder aktiven Zuständen vorbehalten.

### Zustände

| Zustand        | Verhalten                                                     |
| -------------- | ------------------------------------------------------------- |
| Normal         | Dezenter violetter Rahmen, kein Glow                          |
| Hover          | Helleres Violett, sanfter violetter Glow und leichte Anhebung |
| Focus / Active | Goldener Akzent oder Rahmen mit warmem Glow                   |

Hover-Zustände dürfen sich leicht bewegen, beispielsweise durch eine kleine
Anhebung des Elements. Die Bewegung bleibt subtil und unterstützt das Feedback,
anstatt Aufmerksamkeit um ihrer selbst willen zu erzeugen.

### Ornamentale Rahmen

Cards, besondere Flächen und Hero-Elemente dürfen ornamentale Eckdetails erhalten.

Diese Ornamente sind Teil der Atmosphäre und ersetzen nicht die eigentliche
Interaktionsrückmeldung. Sie bleiben im Normalzustand zurückhaltend und dürfen
bei Hover, Focus oder Active sichtbarer reagieren.

Ornamentale Details sollen bevorzugt mit CSS umgesetzt werden, wenn dies sinnvoll
möglich ist. Dadurch bleiben sie skalierbar und können auf Interaktionen reagieren,
ohne für jeden Rahmen eine eigene Grafik zu benötigen.

Buttons, Inputs und andere funktionale UI-Elemente bleiben dagegen klarer und
verwenden in der Regel keine ornamentalen Eckdetails.

Nicht jede Fläche benötigt einen sichtbaren Rahmen.
Hintergrundunterschiede und Abstände dürfen ebenfalls zur Strukturierung dienen.

## ✨ Tiefe & Glow

### Shadow-Prinzip · v0.1

Dark Magical verwendet Schatten für räumliche Tiefe und Glows für magisches
Interaktionsfeedback. Beide haben unterschiedliche Aufgaben und sollen nicht
miteinander verwechselt werden.

Normale Elemente dürfen einen weichen, dunklen Schatten erhalten, um sich subtil
vom Hintergrund abzuheben. Im Ruhezustand wird kein farbiger Glow verwendet.

### Glow-Intensität · Ambient

Dark Magical verwendet standardmäßig eine mittlere Glow-Intensität.
Der Effekt soll deutlich sichtbar sein, ohne das Element dauerhaft zu überstrahlen.

| Zustand        | Effekt                                      |
| -------------- | ------------------------------------------- |
| Normal         | Subtiler dunkler Shadow, kein farbiger Glow |
| Hover          | Weicher violetter Ambient Glow              |
| Focus / Active | Warmer goldener Ambient Glow                |

Glows unterstützen Interaktion und Hierarchie.
Sie werden gezielt eingesetzt und sind kein permanenter Dekorationseffekt.

Besondere Hero-Elemente oder seltene magische Momente dürfen stärkere Effekte
verwenden, solange die Standardoberfläche ruhig und gut lesbar bleibt.

## 🔘 Buttons

### Button-Hierarchie · v0.1

Dark Magical verwendet drei grundlegende Button-Rollen.
Ihre visuelle Stärke richtet sich nach der Bedeutung der jeweiligen Aktion.

| Rolle         | Verwendung                                                              |
| ------------- | ----------------------------------------------------------------------- |
| Primary       | Wichtigste oder zentrale Aktion eines Bereichs                          |
| Secondary     | Normale wichtige Aktionen, die den Primary unterstützen                 |
| Ghost / Quiet | Zurückhaltende Aktionen wie Abbrechen, Zurück oder optionale Funktionen |

Eine Ansicht sollte nicht unnötig viele Primary Buttons gleichzeitig verwenden.
Die visuelle Hierarchie soll deutlich machen, welche Aktion im aktuellen Kontext
am wichtigsten ist.

### Form & Typografie

Buttons verwenden **Noto Sans** und den funktionalen Standard-Radius von `0.75rem`.

Sie bleiben klar und gut lesbar und verwenden im Normalfall keine ornamentalen
Eckdetails. Atmosphäre entsteht hauptsächlich durch Farbe, Tiefe und
Interaktionsfeedback.

### Interaktionszustände

Buttons folgen der allgemeinen Interaktionssprache von Dark Magical:

| Zustand        | Verhalten                                                |
| -------------- | -------------------------------------------------------- |
| Normal         | Ruhig, klar erkennbar und ohne permanenten Glow          |
| Hover          | Violette Hervorhebung, Ambient Glow und leichte Anhebung |
| Focus / Active | Goldene Hervorhebung mit warmem Ambient Glow             |

Die leichte Anhebung bei Hover beträgt standardmäßig ungefähr `-2px`.

Focus-Zustände müssen deutlich erkennbar bleiben und dürfen nicht ausschließlich
durch Bewegung vermittelt werden.

### Icons

Icons dürfen Button-Texte unterstützen, wenn sie die Bedeutung einer Aktion
schneller erfassbar machen.

Sie ersetzen verständliche Beschriftungen nicht automatisch und sollen
zurückhaltend eingesetzt werden.

### Visuelle Rollen

#### Primary

Der Primary Button verwendet eine violette Fläche mit einem feinen goldenen Rahmen.
Gold kennzeichnet ihn bereits im Ruhezustand als wichtigste Aktion, ohne einen
permanenten Glow zu erzeugen.

Bei Hover übernimmt die magische violette Interaktionsreaktion.
Focus und Active werden durch den warmen goldenen Glow deutlich hervorgehoben.

#### Secondary

Secondary Buttons bleiben ruhiger als der Primary.
Sie verwenden eine dunklere Fläche mit violettem Rahmen und verzichten im
Ruhezustand auf goldene Hervorhebung.

#### Ghost / Quiet

Ghost Buttons sind die visuell zurückhaltendste Button-Rolle.
Sie verwenden eine weitgehend transparente Fläche und eine dezente violette
Abgrenzung.

Sie bleiben klar als interaktive Elemente erkennbar, konkurrieren aber nicht
mit wichtigeren Aktionen.

### Größe & Abstände

Dark Magical verwendet in v0.1 zunächst eine gemeinsame Standardgröße für Buttons.

Der Innenabstand wird aus der bestehenden Spacing-Skala zusammengesetzt:

- Vertikal: `SM` · `0.75rem`
- Horizontal: `LG` · `1.5rem`
- Abstand zwischen Icon und Text: `XS` · `0.5rem`

Buttons erhalten keine feste Höhe. Ihre Größe ergibt sich aus Typografie,
Padding und Border.

Weitere Größenvarianten werden erst ergänzt, wenn sich dafür bei der
praktischen Nutzung ein konkreter Bedarf zeigt.

## 📝 Inputs & Formulare

### Input-Prinzip · v0.1

Inputs in Dark Magical bleiben ruhig, klar lesbar und funktional.

Sie folgen der bestehenden Interaktionssprache:
Violett bildet den Standardzustand, Gold kennzeichnet den aktiven Fokus
und semantische Farben vermitteln Status wie Fehler oder Erfolg.

Inputs verwenden keine ornamentalen Eckdetails.
Die magische Atmosphäre entsteht durch Farbe, Border und gezieltes
Interaktionsfeedback.

### Typografie & Grundform

Inputs verwenden **Noto Sans** und den funktionalen Standard-Radius von `0.75rem`.

Eingegebener Text verwendet **Soft Light**.
Placeholder und zurückhaltende Hinweise verwenden **Muted Lavender**.

Die Input-Fläche orientiert sich an **Raised Plum** und hebt sich damit
subtil vom Seitenhintergrund ab.

### Interaktionszustände

| Zustand  | Verhalten                                                               |
| -------- | ----------------------------------------------------------------------- |
| Normal   | Ruhige dunkle Fläche mit dezentem violettem Rahmen                      |
| Hover    | Etwas deutlicheres Violett; zurückhaltender als der Hover eines Buttons |
| Focus    | Goldener Rahmen mit warmem Ambient Glow                                 |
| Disabled | Sichtbar gedämpft und nicht interaktiv, aber weiterhin lesbar           |
| Error    | Semantische rote Hervorhebung mit Fehlermeldung am Feld                 |
| Success  | Semantische grüne Hervorhebung mit positiver Rückmeldung am Feld        |

Focus muss deutlich sichtbar sein und darf nicht ausschließlich durch einen
Glow vermittelt werden.

Error- und Success-Zustände sollen nicht nur durch Farbe kommuniziert werden.
Ein verständlicher Hinweis am jeweiligen Feld ergänzt die visuelle Rückmeldung.

### Semantische Statusfarben

Dark Magical verwendet für Formular-Feedback zwei zusätzliche semantische Farben:

| Status  | Farbe       | Hex       |
| ------- | ----------- | --------- |
| Error   | Vaelira Red | `#a83f4b` |
| Success | Sage Green  | `#5a8f6b` |

Beide Farben sind bewusst leicht gedämpft, damit sie sich harmonisch in die
Dark-Magical-Palette einfügen und trotzdem eindeutig als Status erkennbar bleiben.

Statusfarben werden nicht als alleinige Rückmeldung verwendet.
Error und Success werden zusätzlich durch verständlichen Text und bei Bedarf
durch ein unterstützendes Icon kommuniziert.

### Größe & Abstände

Inputs verwenden ihre Innenabstände aus der bestehenden Spacing-Skala:

- Vertikal: `SM` · `0.75rem`
- Horizontal: `MD` · `1rem`

Zwischen Label und Eingabefeld wird standardmäßig `XS` · `0.5rem` verwendet.

Hinweis-, Error- oder Success-Texte stehen ebenfalls mit `XS` · `0.5rem`
Abstand zum zugehörigen Eingabefeld.

Zusammengehörige Formularelemente sollen als klare visuelle Einheit erkennbar
bleiben. Größere Abstände zwischen verschiedenen Feldern oder Formulargruppen
werden aus der allgemeinen Spacing-Skala gewählt.

Inputs erhalten keine feste Höhe. Ihre Größe ergibt sich aus Typografie,
Padding und Border.

## 🃏 Cards

### Card-Prinzip · v0.1

Cards in Dark Magical sind ruhige, gemütliche Informationsflächen.

Sie strukturieren zusammengehörige Inhalte und dürfen durch weiche
Rundungen, subtile Tiefe und zurückhaltende magische Details
Charakter erhalten.

Die Lesbarkeit und Informationshierarchie haben dabei Vorrang
vor dekorativen Effekten.

### Grundform

| Eigenschaft | Standard            |
| ----------- | ------------------- |
| Hintergrund | Raised Plum         |
| Radius      | `1.5rem`            |
| Border      | `1px` Arcane Purple |
| Shadow      | Surface Shadow      |
| Padding     | `MD` · `1rem`       |

Zwischen zusammengehörigen Elementen innerhalb einer Card wird
standardmäßig `SM` · `0.75rem` verwendet.

Zwischen eigenständigen Cards eignet sich `LG` · `1.5rem`
als Ausgangspunkt.

### Interaktionszustände

Cards unterscheiden zwischen informativen und interaktiven Flächen.

**Informative Cards**

- Bleiben im Normalzustand ruhig.
- Benötigen keinen Hover-Lift oder magischen Hover-Glow.
- Dürfen dekorative Details besitzen.

**Interaktive Cards**

- Müssen als anklickbar erkennbar sein.
- Reagieren bei Hover mit sanftem Purple Ambient Glow.
- Dürfen sich um `-2px` anheben.
- Verwenden bei Keyboard-Focus eine deutlich sichtbare
  goldene Hervorhebung.

Nicht jede Card ist automatisch ein interaktives Element.

### Ornamentale Details

Cards dürfen kleine ornamentale Eckdetails erhalten.

Diese bleiben im Normalzustand zurückhaltend und dürfen
bei Interaktion subtil hervorgehoben werden.

Ornamente sind optional und sollen bevorzugt mit CSS
umgesetzt werden, wenn dies sinnvoll möglich ist.

Sie dürfen weder Inhalte verdecken noch die Bedienbarkeit
beeinträchtigen.

## 🧭 Navigation

### Navigations-Prinzip · v0.1

Navigation in Dark Magical ist klar, ruhig und intuitiv.

Nutzer sollen jederzeit erkennen können, wo sie sich befinden,
welche Bereiche erreichbar sind und welches Element gerade
fokussiert wird.

Die Navigation darf magischen Charakter besitzen, ohne die
Orientierung zu erschweren.

### Typografie & Grundform

Navigationslinks verwenden **Noto Sans**.

Die Navigation orientiert sich an der bestehenden Farbpalette
und verwendet Deep Plum oder Raised Plum als Hintergrund.

Abstände werden aus der vorhandenen Spacing-Skala gewählt.

### Aktiver Navigationspunkt · Arcane Pill

Der aktuell ausgewählte Navigationspunkt erhält eine
dezente violette Fläche mit einem feinen goldenen Rahmen.

Die Markierung ist weich und pillenförmig.

Sie bleibt auch ohne Hover deutlich erkennbar und verwendet
keinen permanenten Glow.

Die Arcane Pill ist die bevorzugte aktive Markierung für
Dark Magical.

### Interaktionszustände

| Zustand        | Verhalten                                                          |
| -------------- | ------------------------------------------------------------------ |
| Normal         | Ruhiger, gut lesbarer Navigationslink                              |
| Hover          | Dezente violette Hervorhebung                                      |
| Active         | Violette Pill-Fläche mit feinem goldenem Rahmen                    |
| Keyboard-Focus | Deutlich sichtbare goldene Fokusmarkierung mit warmem Ambient Glow |

Die aktive Seite muss unabhängig von Hover und Keyboard-Focus
erkennbar bleiben.

### Orientierung & Bedienbarkeit

Navigation muss auch ohne dekorative Effekte verständlich sein.

Aktive Navigationspunkte sollen zusätzlich semantisch
gekennzeichnet werden, beispielsweise mit `aria-current="page"`.

Keyboard-Focus darf nicht ausschließlich durch Farbe oder
Bewegung vermittelt werden.

Das Arcane-Pill-Prinzip kann sowohl in horizontaler Navigation
als auch in einer Sidebar verwendet werden.

Konkrete Navigationslayouts werden abhängig vom jeweiligen
Projekt gestaltet.

## 🪄 Motion & Animation

### Motion-Prinzip · v0.1

Dark Magical verwendet sanfte, reaktionsfreudige Animationen.

Bewegung unterstützt Interaktion, Orientierung und Atmosphäre.
Sie darf die Bedienbarkeit nicht beeinträchtigen oder unnötig
Aufmerksamkeit beanspruchen.

**Leitgedanke:**
Im Ruhezustand atmosphärisch. Bei Interaktion lebendig.

### Animationstempo · Soft Magic

Die Standarddauer für funktionale UI-Übergänge beträgt `180ms`.

Dies gilt insbesondere für:

- Farbwechsel
- Border-Änderungen
- Glow- und Shadow-Übergänge
- Subtile Hover-Bewegungen

UI-Animationen bleiben kurz und unmittelbar.
Atmosphärische Animationen dürfen langsamer ablaufen und
werden bei Bedarf gesondert gestaltet.

### Bewegung nach Element

| Element           | Verhalten                                                   |
| ----------------- | ----------------------------------------------------------- |
| Buttons           | Sanfter Hover-Lift um `-2px` mit Purple Ambient Glow        |
| Interaktive Cards | Subtiler Hover-Lift und Purple Ambient Glow                 |
| Informative Cards | Keine notwendige Hover-Animation                            |
| Inputs            | Ruhige Farb-, Border- und Glow-Übergänge ohne Lift          |
| Navigation        | Dezente Farbwechsel ohne unnötige Bewegung                  |
| Keyboard-Focus    | Deutlich sichtbare Hervorhebung ohne erforderliche Bewegung |

### Atmosphärische Animationen

Dekorative Elemente wie magische Runen, kleine Critters oder
Pixelart-Details dürfen eigene Animationen erhalten.

Diese bleiben zurückhaltend und sollen die Oberfläche lebendig
wirken lassen, ohne vom eigentlichen Inhalt abzulenken.

Normale Buttons, Cards und andere funktionale Elemente erhalten
keine permanenten dekorativen Animationen.

### Reduced Motion

Dark Magical berücksichtigt `prefers-reduced-motion`.

Wird reduzierte Bewegung bevorzugt, werden nicht notwendige
Animationen entfernt oder deutlich reduziert.

Interaktionszustände müssen weiterhin eindeutig erkennbar sein.
Bewegung darf niemals die einzige Form von Feedback sein.

## 🐈‍⬛ Pixelart, Critters & magische Details

### Gestalterisches Prinzip · v0.1

Dark Magical verbindet eine ruhige, funktionale Oberfläche mit
verspielten, magischen und gelegentlich unerwarteten Details.

Die Gestaltung darf Persönlichkeit besitzen und kleine
Entdeckungsmomente ermöglichen.

Dekoration unterstützt den Charakter der Oberfläche,
ohne die eigentliche Bedienung zu erschweren.

### Pixelart

Pixelart ist eine bewusst gewählte gestalterische Richtung
für Dark Magical.

Sie eignet sich insbesondere für:

- Kleine Kreaturen und Charaktere
- Dekorative Szenen und Illustrationen
- Atmosphärische Details und Easter Eggs
- Besondere visuelle Akzente

Nicht jedes UI-Element muss in Pixelart gestaltet sein.

Typografie, Formulare, Navigation und andere funktionale
Elemente behalten ihre gute Lesbarkeit und Bedienbarkeit.

Pixelart soll bei der Darstellung möglichst klar und
bewusst pixelig bleiben, statt unbeabsichtigt weichgezeichnet
zu wirken.

### Critters & kleine Kreaturen

Kleine Kreaturen dürfen die Oberfläche beleben.

Sie können beispielsweise:

- Aus einer Ecke hervorschauen
- Gelegentlich blinzeln oder sich bewegen
- Subtil auf Interaktionen reagieren
- Als kleine Entdeckung an unerwarteten Stellen auftauchen

Critters sind optionale Persönlichkeitselemente.

Sie dürfen keine wichtigen Inhalte verdecken,
keine Interaktionen blockieren und nicht dauerhaft
Aufmerksamkeit einfordern.

Die Bedienbarkeit der Anwendung darf niemals von ihnen
abhängen.

### Magische Details & Ornamente

Magische Atmosphäre entsteht bevorzugt durch gezielte Details:

- Kleine goldene Lichtakzente
- Violette Ambient Glows
- Ornamentale Eckdetails
- Zurückhaltende Runen und Symbole
- Subtile Reaktionen auf Interaktion

Die Gestaltung folgt dem bestehenden Motion-Prinzip:

**Im Ruhezustand atmosphärisch. Bei Interaktion lebendig.**

Nicht jede Oberfläche benötigt zusätzliche Dekoration.

### Bewegung & Zugänglichkeit

Dekorative Animationen bleiben zurückhaltend.

Die Einstellung `prefers-reduced-motion` wird berücksichtigt.
Nicht notwendige Bewegungen werden entsprechend reduziert
oder deaktiviert.

Dekorative Elemente sollen auch für assistive Technologien
als Dekoration behandelt werden, sofern sie keine
inhaltliche Bedeutung vermitteln.

### Gestalterische Freiheit

Pixelart, Critters und magische Details sind Möglichkeiten,
keine verpflichtenden Bestandteile jeder Seite.

Ihr Einsatz richtet sich nach dem jeweiligen Projekt
und dessen tatsächlichen Anforderungen.

Dark Magical soll Persönlichkeit zeigen, ohne die
funktionale Klarheit zu verlieren.
