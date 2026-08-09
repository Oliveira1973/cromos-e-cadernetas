# As Minhas Cadernetas

Site (PWA) para acompanhar a coleção de cromos: cadernetas, cromos tenho/falta, e especiais.

## Como publicar (GitHub Pages — grátis)

1. Copia todo o conteúdo desta pasta para o teu repositório `cromos-e-cadernetas`
   (mantém a estrutura de pastas: `data/`, `cromos/`, `images/`, `icons/`, `index.html`, `manifest.json`, `sw.js`).
2. No GitHub, vai a **Settings → Pages**.
3. Em "Build and deployment", escolhe **Deploy from a branch**, branch `main`, pasta `/ (root)`.
4. Guarda. Ao fim de 1-2 minutos o site fica disponível em:
   `https://oliveira1973.github.io/cromos-e-cadernetas/`
5. No telemóvel, abre esse link no browser e usa "Adicionar ao ecrã principal"
   (Safari: partilhar → Adicionar ao Ecrã Principal / Chrome: menu → Instalar app).
   Fica com ícone próprio, como uma app normal.

## Como atualizar os dados

### Adicionar uma nova caderneta
Edita `data/cadernetas.json` e acrescenta um novo objeto:

```json
{
  "id": "nome-unico-sem-espacos",
  "nome": "Nome a mostrar",
  "editora": "Panini",
  "ano": 2026,
  "totalCromos": 200,
  "capa": "images/capas/nome-unico-sem-espacos.jpg"
}
```

Depois cria o ficheiro `cromos/nome-unico-sem-espacos.json` com a lista de cromos:

```json
[
  { "numero": "1", "nome": "Nome do cromo", "tenho": false, "especial": false },
  { "numero": "2", "nome": "...", "tenho": true, "especial": true }
]
```

(`nome` do cromo é opcional — podes deixar `""` se não quiseres descrever cada um.)

### Marcar um cromo como "tenho"
No ficheiro `cromos/<id>.json`, muda `"tenho": false` para `"tenho": true` no cromo correspondente.
Podes editar diretamente no GitHub: abre o ficheiro → ícone do lápis → edita → "Commit changes".

### Adicionar a imagem de capa
Faz upload da imagem para `images/capas/` (idealmente já redimensionada, ver nota abaixo) e
preenche o campo `"capa"` na caderneta com o caminho, ex: `"images/capas/panini-mundial-2026.jpg"`.
Sem imagem, o site mostra automaticamente um placeholder com as iniciais.

## Nota sobre tamanho das imagens

Com ~300 cadernetas, as imagens podem ocupar muito espaço rapidamente. Sugestão:
- Redimensiona as capas para no máximo ~800px de largura antes de fazer upload
  (reduz muito o tamanho do ficheiro sem perda visível no telemóvel).
- Formatos `.jpg` ou `.webp` ficam mais leves que `.png` para fotos.

## Estrutura de pastas

```
cromos-e-cadernetas/
├── index.html          (o site)
├── manifest.json        (configuração da PWA)
├── sw.js                (funciona offline depois da 1ª visita)
├── icons/                icones da app
├── data/
│   └── cadernetas.json   (índice de todas as cadernetas)
├── cromos/
│   └── <id>.json         (um ficheiro por caderneta, com a lista de cromos)
└── images/
    └── capas/             (imagens de capa das cadernetas)
```
