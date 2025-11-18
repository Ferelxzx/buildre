import React, { useState } from 'react';
import { Plus, Type, Image, Square, Video, Layout, Menu, Eye, Save, Undo, Redo, Trash2, Copy, AlignLeft, AlignCenter, AlignRight, Palette, Download, Settings, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Donmaynd() {
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [isPreview, setIsPreview] = useState(false);
  const [history, setHistory] = useState([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('elements');
  const [pageSettings, setPageSettings] = useState({
    backgroundColor: '#FFFFFF',
    width: 1000,
  });

  const tools = [
    { id: 'text', icon: Type, label: 'Text', category: 'basic' },
    { id: 'heading', icon: Type, label: 'Heading', category: 'basic' },
    { id: 'button', icon: Square, label: 'Button', category: 'basic' },
    { id: 'image', icon: Image, label: 'Image', category: 'media' },
    { id: 'video', icon: Video, label: 'Video', category: 'media' },
    { id: 'container', icon: Layout, label: 'Container', category: 'layout' },
    { id: 'navbar', icon: Menu, label: 'Navigation Bar', category: 'layout' },
    { id: 'footer', icon: Layout, label: 'Footer', category: 'layout' },
    { id: 'social', icon: Facebook, label: 'Social Icons', category: 'interactive' },
  ];

  const templates = [
    { id: 'blank', name: 'Blank Page', elements: [] },
    {
      id: 'landing',
      name: 'Landing Page',
      elements: [
        { id: 1, type: 'navbar', x: 0, y: 0, width: 1000, height: 80, content: 'My Brand', style: { backgroundColor: '#1F2937', color: '#FFFFFF', fontSize: '20px' } },
        { id: 2, type: 'heading', x: 300, y: 150, width: 400, height: 80, content: 'Welcome to My Website', style: { backgroundColor: 'transparent', color: '#1F2937', fontSize: '36px', fontWeight: 'bold', textAlign: 'center' } },
        { id: 3, type: 'text', x: 250, y: 250, width: 500, height: 60, content: 'Create amazing websites with our drag and drop builder', style: { backgroundColor: 'transparent', color: '#6B7280', fontSize: '18px', textAlign: 'center' } },
        { id: 4, type: 'button', x: 425, y: 350, width: 150, height: 50, content: 'Get Started', style: { backgroundColor: '#0066FF', color: '#FFFFFF', fontSize: '16px', borderRadius: '8px' } },
      ]
    },
    {
      id: 'business',
      name: 'Business Site',
      elements: [
        { id: 1, type: 'navbar', x: 0, y: 0, width: 1000, height: 70, content: 'Company Name', style: { backgroundColor: '#FFFFFF', color: '#000000', fontSize: '24px' } },
        { id: 2, type: 'heading', x: 100, y: 120, width: 800, height: 60, content: 'Professional Business Solutions', style: { backgroundColor: 'transparent', color: '#1F2937', fontSize: '32px', fontWeight: 'bold' } },
        { id: 3, type: 'container', x: 100, y: 220, width: 250, height: 200, content: '', style: { backgroundColor: '#F3F4F6', borderRadius: '12px' } },
        { id: 4, type: 'container', x: 375, y: 220, width: 250, height: 200, content: '', style: { backgroundColor: '#F3F4F6', borderRadius: '12px' } },
        { id: 5, type: 'container', x: 650, y: 220, width: 250, height: 200, content: '', style: { backgroundColor: '#F3F4F6', borderRadius: '12px' } },
      ]
    }
  ];

  const addElement = (type) => {
    const elementDefaults = {
      text: { width: 200, height: 50, content: 'Edit this text', fontSize: '16px', color: '#000000' },
      heading: { width: 400, height: 60, content: 'Your Heading Here', fontSize: '32px', color: '#1F2937', fontWeight: 'bold' },
      button: { width: 150, height: 45, content: 'Click Me', fontSize: '14px', color: '#FFFFFF', backgroundColor: '#0066FF', borderRadius: '6px' },
      image: { width: 250, height: 200, content: '', fontSize: '12px', color: '#9CA3AF', backgroundColor: '#E5E7EB' },
      video: { width: 400, height: 225, content: '', fontSize: '12px', color: '#9CA3AF', backgroundColor: '#1F2937' },
      container: { width: 300, height: 200, content: '', fontSize: '14px', color: '#000000', backgroundColor: '#F9FAFB', borderRadius: '8px' },
      navbar: { width: 1000, height: 80, content: 'Logo', fontSize: '20px', color: '#FFFFFF', backgroundColor: '#1F2937' },
      footer: { width: 1000, height: 150, content: '© 2025 Your Company', fontSize: '14px', color: '#FFFFFF', backgroundColor: '#374151' },
      social: { width: 200, height: 50, content: '', fontSize: '24px', color: '#1F2937', backgroundColor: 'transparent' },
    };

    const defaults = elementDefaults[type] || {};
    const newElement = {
      id: Date.now(),
      type,
      x: type === 'navbar' ? 0 : 100,
      y: type === 'navbar' ? 0 : 100,
      width: defaults.width || 200,
      height: defaults.height || 150,
      content: defaults.content || '',
      style: {
        backgroundColor: defaults.backgroundColor || 'transparent',
        color: defaults.color || '#000000',
        fontSize: defaults.fontSize || '16px',
        fontWeight: defaults.fontWeight || 'normal',
        textAlign: 'left',
        borderRadius: defaults.borderRadius || '0px',
      }
    };

    const newElements = [...elements, newElement];
    setElements(newElements);
    addToHistory(newElements);
  };

  const addToHistory = (newElements) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(JSON.parse(JSON.stringify(newElements)));
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setElements(JSON.parse(JSON.stringify(history[historyIndex - 1])));
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setElements(JSON.parse(JSON.stringify(history[historyIndex + 1])));
    }
  };

  const updateElement = (id, updates) => {
    const newElements = elements.map(el => el.id === id ? { ...el, ...updates } : el);
    setElements(newElements);
  };

  const updateElementStyle = (id, styleUpdates) => {
    const newElements = elements.map(el =>
      el.id === id ? { ...el, style: { ...el.style, ...styleUpdates } } : el
    );
    setElements(newElements);
    addToHistory(newElements);
  };

  const deleteElement = () => {
    if (selectedElement) {
      const newElements = elements.filter(el => el.id !== selectedElement);
      setElements(newElements);
      addToHistory(newElements);
      setSelectedElement(null);
    }
  };

  const duplicateElement = () => {
    if (selectedElement) {
      const element = elements.find(el => el.id === selectedElement);
      if (element) {
        const newElement = { ...element, id: Date.now(), x: element.x + 20, y: element.y + 20 };
        const newElements = [...elements, newElement];
        setElements(newElements);
        addToHistory(newElements);
      }
    }
  };

  const loadTemplate = (template) => {
    setElements(JSON.parse(JSON.stringify(template.elements)));
    addToHistory(template.elements);
  };

  const exportHTML = () => {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website</title>
    <style>
        body { margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: ${pageSettings.backgroundColor}; }
        .container { width: ${pageSettings.width}px; margin: 0 auto; position: relative; min-height: 800px; }
    </style>
</head>
<body>
    <div class="container">
        ${elements.map(el => `<div style="position: absolute; left: ${el.x}px; top: ${el.y}px; width: ${el.width}px; height: ${el.height}px; background-color: ${el.style.backgroundColor}; color: ${el.style.color}; font-size: ${el.style.fontSize};">${el.content}</div>`).join('')}
    </div>
</body>
</html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-website.html';
    a.click();
  };

  const handleDragStart = (e, id) => {
    e.dataTransfer.effectAllowed = 'move';
    setSelectedElement(id);
  };

  const handleDrag = (e, id) => {
    if (e.clientX === 0 && e.clientY === 0) return;
    const canvas = document.getElementById('canvas');
    const rect = canvas.getBoundingClientRect();
    const x = Math.max(0, e.clientX - rect.left - 100);
    const y = Math.max(0, e.clientY - rect.top - 25);
    updateElement(id, { x, y });
  };

  const handleDragEnd = () => {
    addToHistory(elements);
  };

  const selectedEl = elements.find(el => el.id === selectedElement);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-blue-600">DONMAYND Builder

          </h1>
          <span className="text-sm text-gray-500">My Site</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={undo}
            disabled={historyIndex === 0}
            className="p-2 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
            title="Undo"
          >
            <Undo className="w-5 h-5" />
          </button>
          <button
            onClick={redo}
            disabled={historyIndex === history.length - 1}
            className="p-2 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
            title="Redo"
          >
            <Redo className="w-5 h-5" />
          </button>
          <div className="w-px h-6 bg-gray-300 mx-2"></div>
          <button
            onClick={() => setIsPreview(!isPreview)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <Eye className="w-4 h-4" />
            {isPreview ? 'Edit' : 'Preview'}
          </button>
          <button
            onClick={exportHTML}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            Export HTML
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            <Save className="w-4 h-4" />
            Save
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {!isPreview && (
          <aside className="w-72 bg-white border-r border-gray-200 overflow-y-auto">
            <div className="border-b border-gray-200">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('elements')}
                  className={`flex-1 px-4 py-3 font-medium ${activeTab === 'elements' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                >
                  Add
                </button>
                <button
                  onClick={() => setActiveTab('templates')}
                  className={`flex-1 px-4 py-3 font-medium ${activeTab === 'templates' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                >
                  Templates
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`flex-1 px-4 py-3 font-medium ${activeTab === 'settings' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                >
                  Settings
                </button>
              </div>
            </div>

            <div className="p-4">
              {activeTab === 'elements' && (
                <>
                  <h3 className="font-semibold mb-3 text-gray-700">Basic Elements</h3>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {tools.filter(t => t.category === 'basic').map((tool) => {
                      const Icon = tool.icon;
                      return (
                        <button
                          key={tool.id}
                          onClick={() => addElement(tool.id)}
                          className="flex flex-col items-center gap-2 p-3 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all"
                        >
                          <Icon className="w-6 h-6" />
                          <span className="text-xs font-medium">{tool.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  <h3 className="font-semibold mb-3 text-gray-700">Media</h3>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {tools.filter(t => t.category === 'media').map((tool) => {
                      const Icon = tool.icon;
                      return (
                        <button
                          key={tool.id}
                          onClick={() => addElement(tool.id)}
                          className="flex flex-col items-center gap-2 p-3 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all"
                        >
                          <Icon className="w-6 h-6" />
                          <span className="text-xs font-medium">{tool.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  <h3 className="font-semibold mb-3 text-gray-700">Layout</h3>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {tools.filter(t => t.category === 'layout').map((tool) => {
                      const Icon = tool.icon;
                      return (
                        <button
                          key={tool.id}
                          onClick={() => addElement(tool.id)}
                          className="flex flex-col items-center gap-2 p-3 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all"
                        >
                          <Icon className="w-6 h-6" />
                          <span className="text-xs font-medium">{tool.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  <h3 className="font-semibold mb-3 text-gray-700">Interactive</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {tools.filter(t => t.category === 'interactive').map((tool) => {
                      const Icon = tool.icon;
                      return (
                        <button
                          key={tool.id}
                          onClick={() => addElement(tool.id)}
                          className="flex flex-col items-center gap-2 p-3 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all"
                        >
                          <Icon className="w-6 h-6" />
                          <span className="text-xs font-medium">{tool.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}

              {activeTab === 'templates' && (
                <div className="space-y-3">
                  {templates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => loadTemplate(template)}
                      className="w-full p-4 bg-gray-50 hover:bg-blue-50 rounded-lg text-left transition-all"
                    >
                      <div className="font-medium text-gray-800">{template.name}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {template.elements.length} elements
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {activeTab === 'settings' && selectedEl && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-700">Element Properties</h3>

                  {(selectedEl.type === 'text' || selectedEl.type === 'heading' || selectedEl.type === 'button') && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Text Align</label>
                        <div className="flex gap-1">
                          <button
                            onClick={() => updateElementStyle(selectedEl.id, { textAlign: 'left' })}
                            className={`p-2 rounded ${selectedEl.style.textAlign === 'left' ? 'bg-blue-100' : 'bg-gray-100'}`}
                          >
                            <AlignLeft className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => updateElementStyle(selectedEl.id, { textAlign: 'center' })}
                            className={`p-2 rounded ${selectedEl.style.textAlign === 'center' ? 'bg-blue-100' : 'bg-gray-100'}`}
                          >
                            <AlignCenter className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => updateElementStyle(selectedEl.id, { textAlign: 'right' })}
                            className={`p-2 rounded ${selectedEl.style.textAlign === 'right' ? 'bg-blue-100' : 'bg-gray-100'}`}
                          >
                            <AlignRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Font Size</label>
                        <input
                          type="range"
                          min="12"
                          max="72"
                          value={parseInt(selectedEl.style.fontSize)}
                          onChange={(e) => updateElementStyle(selectedEl.id, { fontSize: `${e.target.value}px` })}
                          className="w-full"
                        />
                        <div className="text-xs text-gray-500 mt-1">{selectedEl.style.fontSize}</div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Text Color</label>
                        <input
                          type="color"
                          value={selectedEl.style.color}
                          onChange={(e) => updateElementStyle(selectedEl.id, { color: e.target.value })}
                          className="w-full h-10 rounded cursor-pointer"
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Background Color</label>
                    <input
                      type="color"
                      value={selectedEl.style.backgroundColor}
                      onChange={(e) => updateElementStyle(selectedEl.id, { backgroundColor: e.target.value })}
                      className="w-full h-10 rounded cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Border Radius</label>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      value={parseInt(selectedEl.style.borderRadius)}
                      onChange={(e) => updateElementStyle(selectedEl.id, { borderRadius: `${e.target.value}px` })}
                      className="w-full"
                    />
                    <div className="text-xs text-gray-500 mt-1">{selectedEl.style.borderRadius}</div>
                  </div>

                  <div className="pt-4 border-t space-y-2">
                    <button
                      onClick={duplicateElement}
                      className="w-full flex items-center gap-2 justify-center p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                      Duplicate
                    </button>
                    <button
                      onClick={deleteElement}
                      className="w-full flex items-center gap-2 justify-center p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && !selectedEl && (
                <div className="text-center text-gray-500 py-8">
                  <Settings className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Select an element to edit its properties</p>
                </div>
              )}
            </div>
          </aside>
        )}

        <main className="flex-1 overflow-auto bg-gray-100 p-8">
          <div
            id="canvas"
            className="relative bg-white mx-auto shadow-lg"
            style={{
              width: `${pageSettings.width}px`,
              minHeight: '800px',
              backgroundColor: pageSettings.backgroundColor
            }}
          >
            {elements.map((element) => (
              <div
                key={element.id}
                draggable={!isPreview}
                onDragStart={(e) => handleDragStart(e, element.id)}
                onDrag={(e) => handleDrag(e, element.id)}
                onDragEnd={handleDragEnd}
                onClick={() => !isPreview && setSelectedElement(element.id)}
                className={`absolute ${!isPreview ? 'cursor-move' : 'cursor-default'} ${selectedElement === element.id && !isPreview ? 'ring-2 ring-blue-500' : ''
                  }`}
                style={{
                  left: element.x,
                  top: element.y,
                  width: element.width,
                  height: element.height,
                  backgroundColor: element.style.backgroundColor,
                  color: element.style.color,
                  fontSize: element.style.fontSize,
                  fontWeight: element.style.fontWeight,
                  textAlign: element.style.textAlign,
                  borderRadius: element.style.borderRadius,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: element.style.textAlign === 'center' ? 'center' : element.style.textAlign === 'right' ? 'flex-end' : 'flex-start',
                  padding: '8px',
                }}
              >
                {(element.type === 'text' || element.type === 'heading') && (
                  <div
                    contentEditable={!isPreview}
                    suppressContentEditableWarning
                    className="outline-none w-full"
                    onBlur={(e) => {
                      updateElement(element.id, { content: e.target.innerText });
                      addToHistory(elements);
                    }}
                  >
                    {element.content}
                  </div>
                )}
                {element.type === 'button' && (
                  <button className="w-full h-full hover:opacity-90 transition-opacity">
                    {element.content}
                  </button>
                )}
                {element.type === 'image' && (
                  <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-gray-300">
                    <div className="text-center">
                      <Image className="w-8 h-8 mx-auto mb-1 text-gray-400" />
                      <span className="text-xs text-gray-400">Image Placeholder</span>
                    </div>
                  </div>
                )}
                {element.type === 'video' && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <Video className="w-8 h-8 mx-auto mb-1 text-gray-400" />
                      <span className="text-xs text-gray-400">Video Placeholder</span>
                    </div>
                  </div>
                )}
                {element.type === 'container' && (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                    Container
                  </div>
                )}
                {element.type === 'navbar' && (
                  <div className="w-full h-full flex items-center justify-between px-6">
                    <div className="font-bold">{element.content}</div>
                    <div className="flex gap-6 text-sm">
                      <span>Home</span>
                      <span>About</span>
                      <span>Services</span>
                      <span>Contact</span>
                    </div>
                  </div>
                )}
                {element.type === 'footer' && (
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <div className="text-sm">{element.content}</div>
                  </div>
                )}
                {element.type === 'social' && (
                  <div className="w-full h-full flex items-center justify-center gap-4">
                    <Facebook className="w-6 h-6" />
                    <Instagram className="w-6 h-6" />
                    <Twitter className="w-6 h-6" />
                  </div>
                )}
              </div>
            ))}

            {elements.length === 0 && !isPreview && (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <Layout className="w-16 h-16 mx-auto mb-3" />
                  <p className="text-xl font-semibold mb-2">Start Building Your Website</p>
                  <p className="text-sm">Add elements from the sidebar or try a template</p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
