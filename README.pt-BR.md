<div align="center">
  <img src="source/public/pulldot-mark.png" alt="Ícone do Pulldot" width="88">
  <h1>Pulldot</h1>
  <p>Uma apresentação rápida do Pulldot para macOS.</p>
  <p>macOS nativo · Gratuito e open source · Licença MIT</p>
  <p><a href="#prévia">Assistir à demo</a> · <a href="#código-fonte">Código-fonte Remotion</a> · <a href="README.md">English</a></p>
</div>

O Pulldot é um aplicativo gratuito e open source para macOS que baixa vídeos e áudios a partir de links. Este repositório contém uma demonstração simulada da interface e o projeto editável feito em Remotion.

## Prévia

[![Assista à demo de 12 segundos do Pulldot](pulldot-poster.png)](pulldot-demo-web.mp4)

*A interface, o link, as informações de mídia, o tamanho e o progresso são simulados nesta demo.*

## O que aparece na demo

- Colagem de um link e identificação automática da mídia.
- Escolha entre vídeo e áudio, com opções de qualidade e tamanho estimado.
- Acompanhamento do progresso, percentual, velocidade e tempo restante.
- Confirmação do arquivo concluído e pronto para abrir no Finder.

## Vídeo

O vídeo H.264 tem resolução 1920×1080, 30 fps, duração de 12 segundos e não possui áudio. Está pronto para ser incorporado a um site:

```html
<video controls muted playsinline poster="pulldot-poster.png">
  <source src="pulldot-demo-web.mp4" type="video/mp4">
</video>
```

## Código-fonte

O projeto Remotion editável está em [source/](source/). Com Node.js e npm instalados:

```sh
cd source
npm ci
npm run studio
npm run render
```

## Licença

A demo e o código-fonte estão disponíveis sob a [licença MIT](LICENSE).

Feito por **Evaldo**.
