import React, { useState, useRef, useEffect } from 'react';
import './LayoutEditor.css';

interface ImageBlock {
  id: string;
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
}

const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 800;

const defaultImages = [
  '/cta-1.jpg',
  '/cta-2.jpg',
  '/cta-3.jpg',
  '/profile.jpg',
];

const LayoutEditor: React.FC = () => {
  const [blocks, setBlocks] = useState<ImageBlock[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ width: 0, height: 0, x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  // Load saved layout from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('intro-layout');
    if (saved) {
      try {
        setBlocks(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load layout:', e);
      }
    }
  }, []);

  // Save layout to localStorage
  const saveLayout = () => {
    localStorage.setItem('intro-layout', JSON.stringify(blocks));
    alert('Layout salvato!');
  };

  // Export layout as CSS
  const exportCSS = () => {
    let css = '/* Generated Layout CSS */\n\n';
    blocks.forEach((block, index) => {
      css += `.intro-img-${index + 1} {\n`;
      css += `  position: absolute;\n`;
      css += `  left: ${((block.x / CANVAS_WIDTH) * 100).toFixed(2)}%;\n`;
      css += `  top: ${((block.y / CANVAS_HEIGHT) * 100).toFixed(2)}%;\n`;
      css += `  width: ${((block.width / CANVAS_WIDTH) * 100).toFixed(2)}%;\n`;
      css += `  height: ${((block.height / CANVAS_HEIGHT) * 100).toFixed(2)}%;\n`;
      css += `  z-index: ${block.zIndex};\n`;
      css += `}\n\n`;
    });

    navigator.clipboard.writeText(css);
    alert('CSS copiato negli appunti!');
  };

  // Add new image block
  const addBlock = (src: string) => {
    const newBlock: ImageBlock = {
      id: `block-${Date.now()}`,
      src,
      x: 50 + Math.random() * 100,
      y: 50 + Math.random() * 100,
      width: 200,
      height: 150,
      zIndex: blocks.length + 1,
    };
    setBlocks([...blocks, newBlock]);
    setSelectedId(newBlock.id);
  };

  // Delete selected block
  const deleteSelected = () => {
    if (selectedId) {
      setBlocks(blocks.filter(b => b.id !== selectedId));
      setSelectedId(null);
    }
  };

  // Handle mouse down on block
  const handleBlockMouseDown = (e: React.MouseEvent, block: ImageBlock) => {
    e.stopPropagation();
    setSelectedId(block.id);

    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left - block.x,
        y: e.clientY - rect.top - block.y,
      });
    }
    setIsDragging(true);
  };

  // Handle mouse down on resize handle
  const handleResizeMouseDown = (e: React.MouseEvent, block: ImageBlock) => {
    e.stopPropagation();
    setSelectedId(block.id);
    setResizeStart({
      width: block.width,
      height: block.height,
      x: e.clientX,
      y: e.clientY,
    });
    setIsResizing(true);
  };

  // Handle mouse move
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!selectedId) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    if (isDragging) {
      const newX = Math.max(0, Math.min(CANVAS_WIDTH - 50, e.clientX - rect.left - dragOffset.x));
      const newY = Math.max(0, Math.min(CANVAS_HEIGHT - 50, e.clientY - rect.top - dragOffset.y));

      setBlocks(blocks.map(b =>
        b.id === selectedId ? { ...b, x: newX, y: newY } : b
      ));
    }

    if (isResizing) {
      const deltaX = e.clientX - resizeStart.x;
      const deltaY = e.clientY - resizeStart.y;
      const newWidth = Math.max(50, resizeStart.width + deltaX);
      const newHeight = Math.max(50, resizeStart.height + deltaY);

      setBlocks(blocks.map(b =>
        b.id === selectedId ? { ...b, width: newWidth, height: newHeight } : b
      ));
    }
  };

  // Handle mouse up
  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  // Handle canvas click (deselect)
  const handleCanvasClick = () => {
    setSelectedId(null);
  };

  // Bring to front
  const bringToFront = () => {
    if (selectedId) {
      const maxZ = Math.max(...blocks.map(b => b.zIndex));
      setBlocks(blocks.map(b =>
        b.id === selectedId ? { ...b, zIndex: maxZ + 1 } : b
      ));
    }
  };

  // Send to back
  const sendToBack = () => {
    if (selectedId) {
      const minZ = Math.min(...blocks.map(b => b.zIndex));
      setBlocks(blocks.map(b =>
        b.id === selectedId ? { ...b, zIndex: minZ - 1 } : b
      ));
    }
  };

  // Reset layout
  const resetLayout = () => {
    if (confirm('Sei sicuro di voler resettare il layout?')) {
      setBlocks([]);
      setSelectedId(null);
      localStorage.removeItem('intro-layout');
    }
  };

  return (
    <div className="layout-editor">
      {/* Toolbar */}
      <div className="editor-toolbar">
        <div className="toolbar-left">
          <h1>Layout Editor</h1>
          <span className="toolbar-hint">Trascina e ridimensiona le immagini</span>
        </div>
        <div className="toolbar-actions">
          <button onClick={saveLayout} className="btn-primary">Salva Layout</button>
          <button onClick={exportCSS} className="btn-secondary">Esporta CSS</button>
          <button onClick={resetLayout} className="btn-danger">Reset</button>
        </div>
      </div>

      <div className="editor-main">
        {/* Sidebar with images */}
        <div className="editor-sidebar">
          <h3>Immagini</h3>
          <div className="image-list">
            {defaultImages.map((src, index) => (
              <div
                key={index}
                className="image-thumbnail"
                onClick={() => addBlock(src)}
              >
                <img src={src} alt={`Image ${index + 1}`} />
                <span>+ Aggiungi</span>
              </div>
            ))}
          </div>

          {selectedId && (
            <div className="selected-controls">
              <h3>Selezione</h3>
              <button onClick={bringToFront}>Porta in primo piano</button>
              <button onClick={sendToBack}>Manda in fondo</button>
              <button onClick={deleteSelected} className="btn-danger">Elimina</button>
            </div>
          )}

          <div className="custom-image">
            <h3>Immagine personalizzata</h3>
            <input
              type="text"
              placeholder="URL immagine..."
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.currentTarget.value) {
                  addBlock(e.currentTarget.value);
                  e.currentTarget.value = '';
                }
              }}
            />
          </div>
        </div>

        {/* Canvas */}
        <div
          className="editor-canvas-container"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div
            ref={canvasRef}
            className="editor-canvas"
            onClick={handleCanvasClick}
            style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}
          >
            {/* Grid overlay */}
            <div className="canvas-grid" />

            {/* Image blocks */}
            {blocks.map(block => (
              <div
                key={block.id}
                className={`image-block ${selectedId === block.id ? 'selected' : ''}`}
                style={{
                  left: block.x,
                  top: block.y,
                  width: block.width,
                  height: block.height,
                  zIndex: block.zIndex,
                }}
                onMouseDown={(e) => handleBlockMouseDown(e, block)}
              >
                <img src={block.src} alt="" draggable={false} />

                {selectedId === block.id && (
                  <>
                    <div className="block-info">
                      {Math.round(block.width)} x {Math.round(block.height)}
                    </div>
                    <div
                      className="resize-handle"
                      onMouseDown={(e) => handleResizeMouseDown(e, block)}
                    />
                  </>
                )}
              </div>
            ))}

            {/* Empty state */}
            {blocks.length === 0 && (
              <div className="canvas-empty">
                <p>Clicca sulle immagini nella sidebar per aggiungerle al canvas</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutEditor;
