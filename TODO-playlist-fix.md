# TODO: Correção Card "Playlist do Nosso Amor"

## Problemas identificados
1. **Traço azil (underline)**: O card está envolvido numa tag `<a href="playlist-carol-biazin.html">`, que por padrão renderiza como link no navegador.
2. **Abre aba em branco**: O JavaScript possui um listener geral para todos os `.story-card` que dispara `window.open(url, '_blank')` ao clicar. Como o card da playlist também tem a classe `.story-card`, esse listener entra em conflito e abre uma aba em branco além de tentar seguir o `href`.

## Plano de correção
- [ ] `index.html`: Substituir a tag `<a>` do card por `<div>`, removendo o `href="playlist-carol-biazin.html"`.
- [ ] `style.css`: Garantir `text-decoration: none` na classe `.story-card` (garantia extra).
- [ ] `script.js`: Excluir o `#playlist-card` do listener geral dos `.story-card` para que ele não dispare o `window.open` em nova aba. O listener específico do playlist (que expande o card) continuará funcionando normalmente.

## Resultado esperado
O card deixará de parecer um link (sem underline azul), e ao clicar apenas expandirá/contrairá a playlist no próprio card, sem abrir nenhuma aba extra.

