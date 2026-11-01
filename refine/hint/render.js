(function () {
  var data = window.REFINE_HINTS || [];
  var root = document.getElementById("hint-root");
  if (!root) return;

  function esc(value) {
    return String(value).replace(/[&<>"']/g, function (ch) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch];
    });
  }

  function p(text) {
    return "<p>" + esc(text) + "</p>";
  }

  function fold(title, inner, extraClass) {
    var cls = "hint-item" + (extraClass ? " " + extraClass : "");
    return (
      '<details class="' + cls + '">' +
        "<summary>" + esc(title) + "</summary>" +
        '<div class="hint-body">' + inner + "</div>" +
      "</details>"
    );
  }

  function nextChain(hints, answer) {
    var html = "";
    if (answer) html = fold("答え", p(answer), "is-answer");
    for (var i = hints.length - 1; i >= 1; i--) {
      html = fold("次のヒント", p(hints[i]) + html);
    }
    return p(hints[0]) + html;
  }

  function renderItem(item) {
    var inner = "";
    var children = (item.items || []).map(renderItem).join("");
    if (item.hints && item.hints.length) {
      inner = nextChain(item.hints, item.answer) + children;
    } else {
      if (item.text) inner += p(item.text);
      if (item.answer) inner += fold("答え", p(item.answer), "is-answer");
      inner += children;
    }
    return fold(item.title, inner);
  }

  root.innerHTML = data.map(function (step) {
    return (
      '<section class="step" id="' + esc(step.id) + '" data-step="' + esc(step.step) + '">' +
        '<p class="label">' + esc(step.label) + "</p>" +
        (step.items || []).map(renderItem).join("") +
        '<a class="hint-link" href="/refine/#' + esc(step.id) + '">← 解答ページに戻る</a>' +
      "</section>"
    );
  }).join("");
})();
