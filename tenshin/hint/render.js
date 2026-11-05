(function () {
  var data = window.TENSHIN_HINTS || [];
  var root = document.getElementById("hint-root");
  if (!root) return;

  function esc(value) {
    return String(value).replace(/[&<>"']/g, function (ch) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch];
    });
  }

  function paragraphs(text) {
    return String(text || "")
      .split(/\n+/)
      .map(function (part) {
        return part.trim();
      })
      .filter(Boolean)
      .map(function (part) {
        return "<p>" + esc(part) + "</p>";
      })
      .join("");
  }

  function fold(title, inner, extraClass) {
    var cls = "hint-item" + (extraClass ? " " + extraClass : "");
    return (
      '<details class="' +
      cls +
      '">' +
      "<summary>" +
      esc(title) +
      "</summary>" +
      '<div class="hint-body">' +
      inner +
      "</div>" +
      "</details>"
    );
  }

  function nextChain(hints, answer) {
    var html = "";
    if (answer) html = fold("答え", paragraphs(answer), "is-answer");
    for (var i = hints.length - 1; i >= 1; i--) {
      html = fold("次のヒント", paragraphs(hints[i]) + html);
    }
    return paragraphs(hints[0]) + html;
  }

  function renderItem(item) {
    var inner = "";
    var children = (item.items || []).map(renderItem).join("");
    if (item.hints && item.hints.length) {
      inner = nextChain(item.hints, item.answer) + children;
    } else {
      if (item.text) inner += paragraphs(item.text);
      if (item.answer) inner += fold("答え", paragraphs(item.answer), "is-answer");
      inner += children;
    }
    return fold(item.title, inner);
  }

  root.innerHTML = data
    .map(function (step) {
      return (
        '<section class="tenshin-step hint-step" id="' +
        esc(step.id) +
        '" data-step="' +
        esc(step.step) +
        '">' +
        '<h2 class="tenshin-step-bar">' +
        esc(step.label) +
        "</h2>" +
        (step.items || []).map(renderItem).join("") +
        '<a class="hint-link" href="/tenshin/#">← 解答ページに戻る</a>' +
        "</section>"
      );
    })
    .join("");
})();
