/**
 * Copyright (c) 2016 Hideki Shiro
 */

/* eslint-disable no-undef */

import TextToSVG from '../src';

window.addEventListener('load', () => {
  const fontURLInput = document.querySelector('#font-url-input');
  const loadButton = document.querySelector('#load-button');
  const loadStatus = document.querySelector('#load-status');
  const textInput = document.querySelector('#text-input');
  const xInput = document.querySelector('#x-input');
  const yInput = document.querySelector('#y-input');
  const fontSizeInput = document.querySelector('#font-size-input');
  const kerningInput = document.querySelector('#kerning-input');
  const anchorInput = document.querySelector('#anchor-input');
  const getSVGButton = document.querySelector('#get-svg-button');
  const debugInput = document.querySelector('#debug-input');
  const result = document.querySelector('#result');
  const metrics = document.querySelector('#metrics');
  const metricsData = document.querySelector('#metrics-data');

  let textToSVG;

  loadButton.onclick = () => {
    loadStatus.textContent = 'loading...';
    const url = fontURLInput.value;
    TextToSVG.load(url, (err, t2s) => {
      if (err) {
        loadStatus.textContent = err;
        return;
      }

      loadStatus.textContent = 'success!';
      textToSVG = t2s;
    });
  };

  getSVGButton.onclick = () => {
    if (textToSVG === null) {
      alert('load font first');
      return;
    }

    const text = textInput.value || '';
    const x = Number(xInput.value || 0);
    const y = Number(yInput.value || 0);
    const fontSize = Number(fontSizeInput.value || 72);
    const kerning = kerningInput.checked;
    const anchor = anchorInput.value || '';

    let svg;
    if (debugInput.checked) {
      svg = textToSVG.getDebugSVG(text, { x, y, fontSize, kerning, anchor });

      const metricsResponse = textToSVG.getMetrics(text, {
        x,
        y,
        fontSize,
        kerning,
        anchor,
      });

      metricsData.innerHTML = JSON.stringify(metricsResponse);
      metrics.classList.add('show');
    } else {
      svg = textToSVG.getSVG(text, { x, y, fontSize, kerning, anchor });
      metrics.classList.remove('show');
    }

    result.innerHTML = svg;
  };
});
