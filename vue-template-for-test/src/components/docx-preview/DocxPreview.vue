<template>
  <div class="docx-preview-wrap">
    <h1>kaimo test docx-preview</h1>
    <h4>
      <input type="file" id="file" accept=".docx" />
      <button @click="handlePreview">预览</button>
    </h4>
    <div id="bodyContainer"></div>
  </div>
</template>

<script>
import { renderAsync } from "docx-preview";
export default {
  name: "DocxPreview",
  data() {
    return {
      docxOptions: {
        className: "kaimo-docx-666", // string：默认和文档样式类的类名/前缀
        inWrapper: true, // boolean：启用围绕文档内容的包装器渲染
        ignoreWidth: false, // boolean：禁用页面的渲染宽度
        ignoreHeight: false, // boolean：禁止渲染页面高度
        ignoreFonts: false, // boolean：禁用字体渲染
        breakPages: true, // boolean：在分页符上启用分页
        ignoreLastRenderedPageBreak: true, // boolean：在 lastRenderedPageBreak 元素上禁用分页
        experimental: false, // boolean：启用实验功能（制表符停止计算）
        trimXmlDeclaration: true, // boolean：如果为true，解析前会从xml文档中移除xml声明
        useBase64URL: false, // boolean：如果为true，图片、字体等会转为base 64 URL，否则使用URL.createObjectURL
        useMathMLPolyfill: false, // boolean：包括用于 chrome、edge 等的 MathML polyfill。
        showChanges: false, // boolean：启用文档更改的实验性渲染（插入/删除）
        debug: false, // boolean：启用额外的日志记录
      },
    };
  },
  created() {
    let base64 =
      "PGh0bWw+CjxoZWFkPgo8TUVUQSBodHRwLWVxdWl2PSJDb250ZW50LVR5cGUiIGNvbnRlbnQ9InRleHQvaHRtbDsgY2hhcnNldD1VVEYtOCI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+LmIxe3doaXRlLXNwYWNlLWNvbGxhcHNpbmc6cHJlc2VydmU7fQouYjJ7bWFyZ2luOiAxLjBpbiAxLjI1aW4gMS4waW4gMS4yNWluO30KLnAxe3RleHQtYWxpZ246Y2VudGVyO2h5cGhlbmF0ZTphdXRvO2ZvbnQtZmFtaWx5OuW+rui9r+mbhem7kTtmb250LXNpemU6MTRwdDt9Ci5wMnt0ZXh0LWFsaWduOmNlbnRlcjtoeXBoZW5hdGU6YXV0bztmb250LWZhbWlseTrlvq7ova/pm4Xpu5E7Zm9udC1zaXplOjExcHQ7fQoucDN7dGV4dC1hbGlnbjpjZW50ZXI7aHlwaGVuYXRlOmF1dG87Zm9udC1mYW1pbHk65b6u6L2v6ZuF6buRO2ZvbnQtc2l6ZToxMnB0O30KLnA0e3RleHQtYWxpZ246anVzdGlmeTtoeXBoZW5hdGU6YXV0bztmb250LWZhbWlseTrlvq7ova/pm4Xpu5E7Zm9udC1zaXplOjExcHQ7fQoucDV7dGV4dC1pbmRlbnQ6LTAuNDU4MzMzMzRpbjttYXJnaW4tbGVmdDowLjQ1ODMzMzM0aW47dGV4dC1hbGlnbjpzdGFydDtoeXBoZW5hdGU6YXV0bztmb250LWZhbWlseTrlvq7ova/pm4Xpu5E7Zm9udC1zaXplOjExcHQ7fQoucDZ7dGV4dC1hbGlnbjpzdGFydDtoeXBoZW5hdGU6YXV0bztmb250LWZhbWlseTrlvq7ova/pm4Xpu5E7Zm9udC1zaXplOjExcHQ7fQoucDd7dGV4dC1hbGlnbjpzdGFydDtoeXBoZW5hdGU6YXV0bztmb250LWZhbWlseTrlvq7ova/pm4Xpu5E7Zm9udC1zaXplOjEycHQ7fQoucDh7dGV4dC1pbmRlbnQ6LTAuMjk1MTM4OWluO21hcmdpbi1sZWZ0OjAuMjk1MTM4OWluO3RleHQtYWxpZ246c3RhcnQ7aHlwaGVuYXRlOmF1dG87Zm9udC1mYW1pbHk65b6u6L2v6ZuF6buRO2ZvbnQtc2l6ZToxMnB0O30KLnA5e3RleHQtYWxpZ246c3RhcnQ7aHlwaGVuYXRlOmF1dG87Zm9udC1mYW1pbHk6VGltZXMgTmV3IFJvbWFuO2ZvbnQtc2l6ZToxMHB0O30KLnAxMHt0ZXh0LWFsaWduOmp1c3RpZnk7aHlwaGVuYXRlOmF1dG87Zm9udC1mYW1pbHk6VGltZXMgTmV3IFJvbWFuO2ZvbnQtc2l6ZToxMHB0O30KLnRkMXt3aWR0aDowLjgzOTU4MzM0aW47cGFkZGluZy1zdGFydDowLjBpbjtwYWRkaW5nLWVuZDowLjBpbjtib3JkZXItYm90dG9tOnRoaW4gc29saWQgYmxhY2s7Ym9yZGVyLWxlZnQ6dGhpbiBzb2xpZCBibGFjaztib3JkZXItcmlnaHQ6dGhpbiBzb2xpZCBibGFjaztib3JkZXItdG9wOnRoaW4gc29saWQgYmxhY2s7fQoudGQye3dpZHRoOjQuNzkxNjY2NWluO3BhZGRpbmctc3RhcnQ6MC4waW47cGFkZGluZy1lbmQ6MC4waW47Ym9yZGVyLWJvdHRvbTp0aGluIHNvbGlkIGJsYWNrO2JvcmRlci1sZWZ0OnRoaW4gc29saWQgYmxhY2s7Ym9yZGVyLXJpZ2h0OnRoaW4gc29saWQgYmxhY2s7Ym9yZGVyLXRvcDp0aGluIHNvbGlkIGJsYWNrO30KLnRkM3t3aWR0aDoxLjU1OTAyNzhpbjtwYWRkaW5nLXN0YXJ0OjAuMGluO3BhZGRpbmctZW5kOjAuMGluO2JvcmRlci1ib3R0b206dGhpbiBzb2xpZCBibGFjaztib3JkZXItbGVmdDp0aGluIHNvbGlkIGJsYWNrO2JvcmRlci1yaWdodDp0aGluIHNvbGlkIGJsYWNrO2JvcmRlci10b3A6dGhpbiBzb2xpZCBibGFjazt9Ci50ZDR7d2lkdGg6MC42NTM0NzIyNGluO3BhZGRpbmctc3RhcnQ6MC4waW47cGFkZGluZy1lbmQ6MC4waW47Ym9yZGVyLWJvdHRvbTp0aGluIHNvbGlkIGJsYWNrO2JvcmRlci1sZWZ0OnRoaW4gc29saWQgYmxhY2s7Ym9yZGVyLXJpZ2h0OnRoaW4gc29saWQgYmxhY2s7Ym9yZGVyLXRvcDp0aGluIHNvbGlkIGJsYWNrO30KLnRkNXt3aWR0aDoyLjU3OTE2NjdpbjtwYWRkaW5nLXN0YXJ0OjAuMGluO3BhZGRpbmctZW5kOjAuMGluO2JvcmRlci1ib3R0b206dGhpbiBzb2xpZCBibGFjaztib3JkZXItbGVmdDp0aGluIHNvbGlkIGJsYWNrO2JvcmRlci1yaWdodDp0aGluIHNvbGlkIGJsYWNrO2JvcmRlci10b3A6dGhpbiBzb2xpZCBibGFjazt9Ci50ZDZ7d2lkdGg6MS4xMTczNjExaW47cGFkZGluZy1zdGFydDowLjBpbjtwYWRkaW5nLWVuZDowLjBpbjtib3JkZXItYm90dG9tOnRoaW4gc29saWQgYmxhY2s7Ym9yZGVyLWxlZnQ6dGhpbiBzb2xpZCBibGFjaztib3JkZXItcmlnaHQ6dGhpbiBzb2xpZCBibGFjaztib3JkZXItdG9wOnRoaW4gc29saWQgYmxhY2s7fQoudGQ3e3dpZHRoOjAuNDgzMzMzMzJpbjtwYWRkaW5nLXN0YXJ0OjAuMGluO3BhZGRpbmctZW5kOjAuMGluO2JvcmRlci1ib3R0b206dGhpbiBzb2xpZCBibGFjaztib3JkZXItbGVmdDp0aGluIHNvbGlkIGJsYWNrO2JvcmRlci1yaWdodDp0aGluIHNvbGlkIGJsYWNrO2JvcmRlci10b3A6dGhpbiBzb2xpZCBibGFjazt9Ci50ZDh7d2lkdGg6MC45Nzg0NzIyM2luO3BhZGRpbmctc3RhcnQ6MC4waW47cGFkZGluZy1lbmQ6MC4waW47Ym9yZGVyLWJvdHRvbTp0aGluIHNvbGlkIGJsYWNrO2JvcmRlci1sZWZ0OnRoaW4gc29saWQgYmxhY2s7Ym9yZGVyLXJpZ2h0OnRoaW4gc29saWQgYmxhY2s7Ym9yZGVyLXRvcDp0aGluIHNvbGlkIGJsYWNrO30KLnRkOXt3aWR0aDo1LjYzMTI1aW47cGFkZGluZy1zdGFydDowLjBpbjtwYWRkaW5nLWVuZDowLjBpbjtib3JkZXItYm90dG9tOnRoaW4gc29saWQgYmxhY2s7Ym9yZGVyLWxlZnQ6dGhpbiBzb2xpZCBibGFjaztib3JkZXItcmlnaHQ6dGhpbiBzb2xpZCBibGFjaztib3JkZXItdG9wOnRoaW4gc29saWQgYmxhY2s7fQouczF7Y29sb3I6IzMzMzMzMzt9Ci5zMntmb250LXNpemU6MTFwdDt9Ci5zM3tjb2xvcjpibGFjazt9Ci5zNHtkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IHRleHQtaW5kZW50OiAwOyBtaW4td2lkdGg6IDAuNDg2MTExMWluO30KLnM1e2ZvbnQtd2VpZ2h0OmJvbGQ7dGV4dC1kZWNvcmF0aW9uOnVuZGVybGluZTt9Ci5yMXtoZWlnaHQ6MC40ODYxMTExaW47a2VlcC10b2dldGhlcjphbHdheXM7fQoucjJ7aGVpZ2h0OjAuNDU4MzMzMzRpbjtrZWVwLXRvZ2V0aGVyOmFsd2F5czt9Ci5yM3toZWlnaHQ6MC42OTQ0NDQ0aW47a2VlcC10b2dldGhlcjphbHdheXM7fQoucjR7aGVpZ2h0OjAuMzQzMDU1NTVpbjtrZWVwLXRvZ2V0aGVyOmFsd2F5czt9Ci50MXt0YWJsZS1sYXlvdXQ6Zml4ZWQ7Ym9yZGVyLWNvbGxhcHNlOmNvbGxhcHNlO2JvcmRlci1zcGFjaW5nOjA7fQo8L3N0eWxlPgo8bWV0YSBjb250ZW50PSJoYW8gcnVhbiIgbmFtZT0iYXV0aG9yIj4KPC9oZWFkPgo8Ym9keSBjbGFzcz0iYjEgYjIiPgo8cCBjbGFzcz0icDEiPgo8c3Bhbj7kvJrorq7nuqropoE8L3NwYW4+CjwvcD4KPHRhYmxlIGNsYXNzPSJ0MSI+Cjx0Ym9keT4KPHRyIGNsYXNzPSJyMSI+Cjx0ZCBjbGFzcz0idGQxIj4KPHAgY2xhc3M9InAyIj4KPHNwYW4+6K6u6aKYPC9zcGFuPgo8L3A+CjwvdGQ+PHRkIGNsYXNzPSJ0ZDIiIGNvbHNwYW49IjUiPgo8cCBjbGFzcz0icDMiPgo8c3BhbiBjbGFzcz0iczEiPuS6kuiBlOe9kea4oOmBk+mcgOaxguivtOaYjuS5pi3miYvmnLrpk7booYzlop7liqDlrprlvIDkuI5UKzHku6PplIDnkIbotKLpnIDmsYI8L3NwYW4+PHNwYW4gY2xhc3M9InMyIj7msp/pgJrkvJo8L3NwYW4+CjwvcD4KPC90ZD4KPC90cj4KPHRyIGNsYXNzPSJyMiI+Cjx0ZCBjbGFzcz0idGQxIj4KPHAgY2xhc3M9InAyIj4KPHNwYW4+5pe26Ze0PC9zcGFuPgo8L3A+CjwvdGQ+PHRkIGNsYXNzPSJ0ZDMiPgo8cCBjbGFzcz0icDIiPgo8c3Bhbj4yMDIyLzEwLzE0IDk6MzA8L3NwYW4+CjwvcD4KPC90ZD48dGQgY2xhc3M9InRkNCI+CjxwIGNsYXNzPSJwMiI+CjxzcGFuPuWcsOeCuTwvc3Bhbj4KPC9wPgo8L3RkPjx0ZCBjbGFzcz0idGQ1IiBjb2xzcGFuPSIzIj4KPHAgY2xhc3M9InAyIj4KPHNwYW4+6IW+6K6v5Lya6K6uPC9zcGFuPgo8L3A+CjwvdGQ+CjwvdHI+Cjx0ciBjbGFzcz0icjEiPgo8dGQgY2xhc3M9InRkMSI+CjxwIGNsYXNzPSJwMiI+CjxzcGFuPuS4u+aMgeS6ujwvc3Bhbj4KPC9wPgo8L3RkPjx0ZCBjbGFzcz0idGQzIj4KPHAgY2xhc3M9InAyIj4KPHNwYW4+6ZmI5LqR5p2wPC9zcGFuPgo8L3A+CjwvdGQ+PHRkIGNsYXNzPSJ0ZDQiPgo8cCBjbGFzcz0icDIiPgo8c3Bhbj7orrDlvZXkuro8L3NwYW4+CjwvcD4KPC90ZD48dGQgY2xhc3M9InRkNiI+CjxwIGNsYXNzPSJwMiI+CjxzcGFuPumZiOS6keadsDwvc3Bhbj4KPC9wPgo8L3RkPjx0ZCBjbGFzcz0idGQ3Ij4KPHAgY2xhc3M9InAyIj4KPHNwYW4+5a6h5qC4PC9zcGFuPgo8L3A+CjwvdGQ+PHRkIGNsYXNzPSJ0ZDgiPgo8cCBjbGFzcz0icDQiPjwvcD4KPC90ZD4KPC90cj4KPHRyIGNsYXNzPSJyMyI+Cjx0ZCBjbGFzcz0idGQxIj4KPHAgY2xhc3M9InAyIj4KPHNwYW4+5Ye65bitPC9zcGFuPgo8L3A+CjwvdGQ+PHRkIGNsYXNzPSJ0ZDIiIGNvbHNwYW49IjUiPgo8cCBjbGFzcz0icDUiPgo8c3Bhbj7pmYjkupHmnbDjgIHlvKDnv7DjgIHpmYjkvJrluprjgIHpmYjkuL3luq3jgIHokovmmIrlvaTjgIHmsarlv5foia/jgIHpmYjkvJ/jgIHpmYjmnaXmiJA8L3NwYW4+CjwvcD4KPC90ZD4KPC90cj4KPHRyIGNsYXNzPSJyNCI+Cjx0ZCBjbGFzcz0idGQxIj4KPHAgY2xhc3M9InAyIj4KPHNwYW4+5YiX5bitPC9zcGFuPgo8L3A+CjwvdGQ+PHRkIGNsYXNzPSJ0ZDIiIGNvbHNwYW49IjUiPgo8cCBjbGFzcz0icDYiPjwvcD4KPC90ZD4KPC90cj4KPHRyIGNsYXNzPSJyNCI+Cjx0ZCBjbGFzcz0idGQ5IiBjb2xzcGFuPSI2Ij4KPHAgY2xhc3M9InA3Ij4KPHNwYW4gY2xhc3M9InMzIj7lhoXlrrnvvJo8L3NwYW4+CjwvcD4KPHAgY2xhc3M9InA3Ij4KPHNwYW4gY2xhc3M9InMxIj4yMDIy5bm0MTDmnIgxNOaXpe+8jOmSiOWvueWFs+S6juS6kuiBlOe9kea4oOmBk+mcgOaxguivtOaYjuS5pi3miYvmnLrpk7booYzlop7liqDlrprlvIDkuI5UKzHku6PplIDnkIbotKLpnIDmsYIg5byA5Lya6L+b6KGM5LqG6K6o6K6644CC5Lya6K6u5LiK6K6o6K665LqG5omL5py66ZO26KGM5LiO6LSi5a+M57O757uf55u45YWz5YaF5a6577yM5bm257uG5YyW5LqG6ZyA5rGC5LiO5o6l5Y+j77yM6LSi5a+M57O757uf5b2T5aSp57q/5LiL56Gu6K6k5peg5o6l5Y+j5pS56YCg77yM5Z2H5ruh6Laz6ZyA5rGC44CCPC9zcGFuPjxzcGFuPuivpuaDheWmguS4i++8mjwvc3Bhbj4KPC9wPgo8cCBjbGFzcz0icDciPgo8c3BhbiBjbGFzcz0iczQiPjEu4oCLJm5ic3A7PC9zcGFuPjxzcGFuIGNsYXNzPSJzNSI+5omL5py66ZO26KGM77ya5omL5py65LiK6LSf6LSj5Luj6ZSA5a6a5byA5byP5ZKMVCsx5Lqn5ZOB5YiX6KGo5bGV56S644CB6K+m5oOF5bGV56S644CB6LSt5Lmw44CB5Y2P6K6u55qE5beu5byC6YOo5YiG5pS56YCg77yM6K+m5oOF6aG16Z2i5Luj6ZSA5Lqn5ZOB5paH5qGj55Sx5rig6YGT5o+Q5L6b77yM5ZCO566h5LiK5Lyg44CC6K+m5oOF6aG15YeA5YC85Z6L5qCH562+5Yig6Zmk77yM5ZCM5q2l6Ieq6JCl55CG6LSi5ZCM5LqL77yI56eL5p6X77yM5bqU5b+D6Iy577yJ44CCIFQrMeS6pOaYk+inhOWImeS4rSZsZHF1bzvku4rml6XkubDlhaUmcmRxdW875pS55oiQJmxkcXVvO+eOsOWcqOS5sOWFpSZyZHF1bzvvvIzlsI9oaeW7uuiuruaUueWKqO+8jOWQjOatpe+8iOeni+ael++8jOW6lOW/g+iMue+8ieOAgjwvc3Bhbj4KPC9wPgo8cCBjbGFzcz0icDciPgo8c3BhbiBjbGFzcz0iczUiPuaYr+WQpuaUr+aMgemihOWPl+eQhumAmui/h+i0ouWvjOaPkOS+m++8jOWIpOaWreaYr+WQpuWPr+S7peWGjeS6pOaYk+aXtumXtOWklui/m+ihjOmihOWPl+eQhui0reS5sOOAgjwvc3Bhbj4KPC9wPgo8cCBjbGFzcz0icDciPgo8c3BhbiBjbGFzcz0iczUiPuivpuingemcgOaxguOAgjwvc3Bhbj4KPC9wPgo8cCBjbGFzcz0icDciPgo8c3BhbiBjbGFzcz0iczQiPjIu4oCLJm5ic3A7PC9zcGFuPjxzcGFuIGNsYXNzPSJzNSI+6LSi5a+M5bmz5Y+w77yaIOmFjeWQiOaJi+acuumTtuihjOaaguaXtuWGheWuueeahOaPkOS+m+OAgjwvc3Bhbj4KPC9wPgo8cCBjbGFzcz0icDgiPgo8c3BhbiBjbGFzcz0iczQiPmEu4oCLJm5ic3A7PC9zcGFuPjxzcGFuPuS7o+mUgOWumuW8gOW8j+S4jlQrMeS6p+WTgeaooeadv+mcgOimgeiDveWMuuWIhjwvc3Bhbj4KPC9wPgo8cCBjbGFzcz0icDgiPgo8c3BhbiBjbGFzcz0iczQiPmIu4oCLJm5ic3A7PC9zcGFuPjxzcGFuPuS6p+WTgeWIl+ihqOaOpeWPo++8mjwvc3Bhbj4KPC9wPgo8cCBjbGFzcz0icDkiPgo8c3Bhbj5UKzHvvJogIOaPkOS+m+S4g+aXpeW5tOWMluaUtuebiueOh++8jOi1t+i0remHkemine+8jOmjjumZqeetiee6p+i0ouWvjOaPkOS+mzwvc3Bhbj4KPC9wPgo8cCBjbGFzcz0icDkiPgo8c3Bhbj7lrprlvIDlvI/vvJrmj5DkvpvmipXotYTmnJ/pmZDvvIzmnKzova7otK3kubDotbfmraLml6XmnJ/vvIzpo47pmannrYnnuqfvvIzkuJrnu6nmr5TovoPln7rlh4bvvIzotbfotK3ph5Hpop3otKLlr4zns7vnu5/mj5Dkvps8L3NwYW4+CjwvcD4KPHAgY2xhc3M9InA5Ij48L3A+CjxwIGNsYXNzPSJwOSI+CjxzcGFuPuS7o+mUgOS6p+WTgeaYr+WQpuaUr+aMgemihOWUrumcgOaPkOS+m+Wtl+auteagh+ivhuOAgjwvc3Bhbj4KPC9wPgo8cCBjbGFzcz0icDkiPjwvcD4KPHAgY2xhc3M9InA4Ij4KPHNwYW4gY2xhc3M9InM0Ij5jLuKAiyZuYnNwOzwvc3Bhbj48c3Bhbj7or6bmg4Xmn6Xor6Lmj5DkvpvvvJo8L3NwYW4+CjwvcD4KPHAgY2xhc3M9InA5Ij4KPHNwYW4+5a6a5byA77ya5LiL6L2u5byA5pS+6LW35pyf6LW35aeL5pel77yM6LW35oGv5pel77yM5Y2V5L2N5YeA5YC877yM6LW36LSt6YeR6aKd77yM6YCS5aKe6YeR6aKd77yM5pys6L2u5Lqk5piT5pe26Ze0PC9zcGFuPgo8L3A+CjxwIGNsYXNzPSJwOSI+CjxzcGFuPlQrMSDvvJrmnKzova7kuqTmmJPml7bpl7TvvIznlLPotY7otLnnjofvvIzliLDotKbml7bpl7TvvIjkuJrliqHkuI7lhbTkuJrmsp/pgJrvvIkgIDwvc3Bhbj4KPC9wPgo8cCBjbGFzcz0icDkiPjwvcD4KPHAgY2xhc3M9InA3Ij48L3A+CjwvdGQ+CjwvdHI+Cjx0ciBjbGFzcz0icjQiPgo8dGQgY2xhc3M9InRkOSIgY29sc3Bhbj0iNiI+CjxwIGNsYXNzPSJwNyI+PC9wPgo8L3RkPgo8L3RyPgo8L3Rib2R5Pgo8L3RhYmxlPgo8cCBjbGFzcz0icDEwIj48L3A+CjwvYm9keT4KPC9odG1sPgo=".replace(
        /^data:image\/\w+;base64,/,
        ""
      );
    var dataBuffer = this.base64DataURLToArrayBuffer(base64);
    console.log("==========", dataBuffer);
    this.docxRender(dataBuffer);
  },
  methods: {
    base64DataURLToArrayBuffer(dataURL) {
      const base64Regex = /^data:image\/(png|jpg|svg|svg\+xml);base64,/;
      // if (!base64Regex.test(dataURL)) {
      //   return false;
      // }
      const stringBase64 = dataURL.replace(base64Regex, "");
      let binaryString;
      if (typeof window !== "undefined") {
        binaryString = window.atob(stringBase64);
      } else {
        binaryString = new Buffer(stringBase64, "base64").toString("binary");
      }
      const len = binaryString.length;  
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        const ascii = binaryString.charCodeAt(i);
        bytes[i] = ascii;
      }
      return bytes.buffer;
    },
    // handlePreview() {
    //   let file = document.getElementById("file").files[0];
    //   console.log(file);
    //   // 将file转为buffer
    //   let fr = new FileReader();
    //   fr.readAsArrayBuffer(file);
    //   fr.addEventListener(
    //     "loadend",
    //     (e) => {
    //       console.log("loadend---->", e);
    //       let buffer = e.target.result;
    //       this.docxRender(buffer);
    //     },
    //     false
    //   );
    // },
    // 渲染docx
    docxRender(buffer) {
      let bodyContainer = document.getElementById("bodyContainer");
      renderAsync(
        buffer, // Blob | ArrayBuffer | Uint8Array, 可以是 JSZip.loadAsync 支持的任何类型
        bodyContainer, // HTMLElement 渲染文档内容的元素,
        null, // HTMLElement, 用于呈现文档样式、数字、字体的元素。如果为 null，则将使用 bodyContainer。
        this.docxOptions // 配置
      ).then((res) => {
        console.log("res---->", res);
      });
    },
  },
};
</script>