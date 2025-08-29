import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  template: `
    <div class="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div class="container mx-auto px-4 py-8 max-w-7xl">
        <!-- Header -->
        <div class="text-center mb-8">
          <div class="flex items-center justify-center mb-4">
            <div class="angular-gradient p-3 rounded-lg mr-4 shadow-lg">
              <i class="fab fa-angular text-white text-3xl"></i>
            </div>
            <div class="text-left">
              <h1 class="text-4xl font-bold text-gray-800">Angular ng new Command Generator</h1>
            </div>
          </div>
 
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Configuration Panel -->
          <div class="bg-white rounded-xl shadow-xl p-6 border border-gray-200">
            <div class="flex items-center mb-6">
              <div class="bg-blue-100 p-2 rounded-lg mr-3">
                <i class="fas fa-cogs text-blue-600 text-xl"></i>
              </div>
              <h2 class="text-2xl font-semibold text-gray-800">Project Configuration</h2>
            </div>

            <form id="configForm" class="space-y-6">
              <!-- App Name -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  <i class="fas fa-rocket mr-1 text-red-500"></i>
                  Project Name *
                </label>
                <input
                  type="text"
                  id="appName"
                  value="my-angular-v17-app"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="my-angular-v17-app"
                  required
                />
                <p class="text-xs text-gray-500 mt-1">
                  This will be your workspace and initial project name
                </p>
              </div>

              <!-- Directory -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  <i class="fas fa-folder-open mr-1 text-yellow-500"></i>
                  Target Directory
                </label>
                <input
                  type="text"
                  id="directory"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Leave empty to use current directory"
                />
                <p class="text-xs text-gray-500 mt-1">
                  Optional: Specify where to create the project
                </p>
              </div>

        

              <!-- Style & Build Configuration -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    <i class="fas fa-paint-brush mr-1 text-pink-500"></i>
                    Styling
                  </label>
                  <select
                    id="style"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  >
                    <option value="css">CSS</option>
                    <option value="scss" selected>SCSS (Recommended)</option>
                    <option value="sass">Sass</option>
                    <option value="less">Less</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    <i class="fas fa-box mr-1 text-green-500"></i>
                    Package Manager
                  </label>
                  <select
                    id="packageManager"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  >
                    <option value="">Auto-detect</option>
                    <option value="npm">npm</option>
                    <option value="yarn">Yarn</option>
                    <option value="pnpm" selected>pnpm (Fast & Efficient)</option>
                    <option value="bun">Bun (Ultra Fast)</option>
                  </select>
                </div>
              </div>

              <!-- AI & Development Tools -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  <i class="fas fa-robot mr-1 text-blue-500"></i>
                  AI Development Assistant
                </label>
                <select
                  id="aiConfig"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                >
                  <option value="">None</option>
                  <option value="claude">Claude (Anthropic)</option>
                  <option value="copilot">GitHub Copilot</option>
                  <option value="cursor">Cursor IDE</option>
                  <option value="gemini">Google Gemini</option>
                  <option value="jetbrains">JetBrains AI</option>
                  <option value="windsurf">Windsurf</option>
                </select>
                <p class="text-xs text-gray-500 mt-1">Generate AI-specific configuration files</p>
              </div>

              <!-- Modern Angular Features -->
              <div class="space-y-3">
                <h3 class="text-lg font-semibold text-gray-700 flex items-center">
                  <i class="fas fa-layer-group mr-2 text-indigo-500"></i>
                  Modern Angular Features
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div class="flex items-center">
                    <input
                      type="checkbox"
                      id="routing"
                      checked
                      class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label for="routing" class="ml-3 block text-sm text-gray-700 tooltip">
                      <i class="fas fa-route mr-1"></i>
                      Angular Router
                      <span class="tooltiptext"
                        >Add routing support with lazy loading and guards</span
                      >
                    </label>
                  </div>

                  <div class="flex items-center">
                    <input
                      type="checkbox"
                      id="strict"
                      checked
                      class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label for="strict" class="ml-3 block text-sm text-gray-700 tooltip">
                      <i class="fas fa-shield-alt mr-1"></i>
                      Strict Mode
                      <span class="tooltiptext"
                        >Enable strict TypeScript and Angular compiler options for better code
                        quality</span
                      >
                    </label>
                  </div>

                  <div class="flex items-center">
                    <input
                      type="checkbox"
                      id="ssr"
                      class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label for="ssr" class="ml-3 block text-sm text-gray-700 tooltip">
                      <i class="fas fa-server mr-1"></i>
                      SSR + Hydration
                      <span class="tooltiptext"
                        >Server-Side Rendering with Angular Universal and new hydration
                        features</span
                      >
                    </label>
                  </div>

                  <div class="flex items-center">
                    <input
                      type="checkbox"
                      id="zoneless"
                      class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label for="zoneless" class="ml-3 block text-sm text-gray-700 tooltip">
                      <i class="fas fa-lightning-bolt mr-1"></i>
                      Zoneless Change Detection
                      <span class="tooltiptext"
                        >Experimental: Use signals-based change detection without Zone.js</span
                      >
                    </label>
                  </div>
                </div>
              </div>

              <!-- Development Options -->
              <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 class="text-lg font-semibold text-gray-700 mb-3 flex items-center">
                  <i class="fas fa-code mr-2 text-gray-600"></i>
                  Development Options
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div class="flex items-center">
                    <input
                      type="checkbox"
                      id="skipGit"
                      class="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                    />
                    <label for="skipGit" class="ml-3 block text-sm text-gray-700">
                      <i class="fab fa-git-alt mr-1"></i>
                      Skip Git initialization
                    </label>
                  </div>

                  <div class="flex items-center">
                    <input
                      type="checkbox"
                      id="skipInstall"
                      class="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                    />
                    <label for="skipInstall" class="ml-3 block text-sm text-gray-700">
                      <i class="fas fa-download mr-1"></i>
                      Skip package installation
                    </label>
                  </div>

                  <div class="flex items-center">
                    <input
                      type="checkbox"
                      id="skipTests"
                      class="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                    />
                    <label for="skipTests" class="ml-3 block text-sm text-gray-700">
                      <i class="fas fa-vial mr-1"></i>
                      Skip test files
                    </label>
                  </div>

                  <div class="flex items-center">
                    <input
                      type="checkbox"
                      id="dryRun"
                      class="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                    />
                    <label for="dryRun" class="ml-3 block text-sm text-gray-700 tooltip">
                      <i class="fas fa-eye mr-1"></i>
                      Dry run (preview only)
                      <span class="tooltiptext"
                        >Show what would be created without actually creating files</span
                      >
                    </label>
                  </div>
                </div>
              </div>

              <!-- Advanced Configuration -->
              <details class="border border-gray-200 rounded-lg">
                <summary
                  class="p-4 bg-gray-50 rounded-lg cursor-pointer font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <i class="fas fa-sliders-h mr-2"></i>
                  Advanced Configuration
                </summary>
                <div class="p-4 space-y-4">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2"
                        >Component Prefix</label
                      >
                      <input
                        type="text"
                        id="prefix"
                        value="app"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2"
                        >View Encapsulation</label
                      >
                      <select
                        id="viewEncapsulation"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Default (Emulated)</option>
                        <option value="Emulated">Emulated</option>
                        <option value="None">None</option>
                        <option value="ShadowDom">ShadowDom</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2"
                      >Schematics Collection</label
                    >
                    <input
                      type="text"
                      id="collection"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="@angular/material, @ngrx/schematics, etc."
                    />
                  </div>
                </div>
              </details>
            </form>
          </div>

          <!-- Generated Commands -->
          <div class="bg-white rounded-xl shadow-xl p-6 border border-gray-200">
            <div class="flex items-center mb-6">
              <div class="bg-green-100 p-2 rounded-lg mr-3">
                <i class="fas fa-terminal text-green-600 text-xl"></i>
              </div>
              <h2 class="text-2xl font-semibold text-gray-800">Generated Commands</h2>
            </div>

            <!-- Command Preview -->
            <div class="mb-6 slide-enter">
              <div class="flex items-center justify-between mb-3">
                <h3 class="text-lg font-semibold text-gray-700 flex items-center">
                  <i class="fas fa-code mr-2 text-blue-600"></i>
                  Create Project Command
                </h3>
                <button
                  onclick="copyCommand('mainCommand')"
                  class="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                >
                  <i class="fas fa-copy mr-2"></i>
                  Copy
                </button>
              </div>
              <div class="bg-gray-900 text-green-400 p-4 rounded-lg border border-gray-700">
                <div class="flex items-start">
                  <span class="text-gray-500 mr-2 select-none">$</span>
                  <span id="mainCommand" class="command-output flex-1 break-all"
                    >ng new my-angular-v17-app</span
                  >
                </div>
              </div>
              <div class="mt-2 text-xs text-gray-600 bg-gray-50 p-2 rounded">
                <i class="fas fa-info-circle mr-1"></i>
                Works on Windows (Command Prompt, PowerShell), macOS, and Linux
              </div>
            </div>

            <!-- Post-Installation Commands -->
            <div class="mb-6 slide-enter">
              <h3 class="text-lg font-semibold text-gray-700 mb-3 flex items-center">
                <i class="fas fa-plus-circle mr-2 text-purple-600"></i>
                Recommended Next Steps
              </h3>

              <div class="space-y-3">
                <!-- Navigate to project -->
                <div class="bg-purple-50 border border-purple-200 rounded-lg p-3">
                  <div class="flex items-center justify-between mb-2">
                    <p class="font-medium text-purple-800 text-sm">1. Navigate to project:</p>
                    <button
                      onclick="copyCommand('cdCommand')"
                      class="text-purple-600 hover:text-purple-800 text-xs"
                    >
                      <i class="fas fa-copy"></i>
                    </button>
                  </div>
                  <code id="cdCommand" class="text-purple-700 text-sm">cd my-angular-v17-app</code>
                </div>

                <!-- Add Tailwind CSS -->
                <div class="bg-cyan-50 border border-cyan-200 rounded-lg p-3">
                  <div class="flex items-center justify-between mb-2">
                    <p class="font-medium text-cyan-800 text-sm">2. Add Tailwind CSS:</p>
                    <button
                      onclick="copyCommand('tailwindCommand')"
                      class="text-cyan-600 hover:text-cyan-800 text-xs"
                    >
                      <i class="fas fa-copy"></i>
                    </button>
                  </div>
                  <code id="tailwindCommand" class="text-cyan-700 text-sm"
                    >ng add @ngtw/tailwind</code
                  >
                </div>

                <!-- Add Angular Material + CDK -->
                <div class="bg-pink-50 border border-pink-200 rounded-lg p-3">
                  <div class="flex items-center justify-between mb-2">
                    <p class="font-medium text-pink-800 text-sm">3. Add Angular Material + CDK:</p>
                    <button
                      onclick="copyCommand('materialCommand')"
                      class="text-pink-600 hover:text-pink-800 text-xs"
                    >
                      <i class="fas fa-copy"></i>
                    </button>
                  </div>
                  <code id="materialCommand" class="text-pink-700 text-sm"
                    >ng add @angular/material</code
                  >
                </div>

                <!-- Start development server -->
                <div class="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div class="flex items-center justify-between mb-2">
                    <p class="font-medium text-green-800 text-sm">4. Start development server:</p>
                    <button
                      onclick="copyCommand('serveCommand')"
                      class="text-green-600 hover:text-green-800 text-xs"
                    >
                      <i class="fas fa-copy"></i>
                    </button>
                  </div>
                  <code id="serveCommand" class="text-green-700 text-sm">ng serve</code>
                </div>
              </div>
            </div>

            <!-- Angular v17+ Features Info -->
            <div
              class="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-4"
            >
              <h4 class="font-semibold text-indigo-900 mb-3 flex items-center">
                <i class="fas fa-rocket mr-2"></i>
                Angular v17+ Benefits
              </h4>
              <ul class="text-sm text-indigo-800 space-y-2">
                <li class="flex items-start">
                  <i class="fas fa-check-circle mr-2 mt-0.5 text-green-500 text-xs"></i>
                  <span
                    ><strong>New Control Flow:</strong> &#64;if, &#64;for , &#64;switch syntax for
                    better performance and type safety</span
                  >
                </li>
                <li class="flex items-start">
                  <i class="fas fa-check-circle mr-2 mt-0.5 text-green-500 text-xs"></i>
                  <span
                    ><strong>Application Builder:</strong> Up to 87% faster builds with esbuild and
                    Vite integration</span
                  >
                </li>
                <li class="flex items-start">
                  <i class="fas fa-check-circle mr-2 mt-0.5 text-green-500 text-xs"></i>
                  <span
                    ><strong>Standalone Components:</strong> Simplified architecture without
                    NgModules</span
                  >
                </li>
                <li class="flex items-start">
                  <i class="fas fa-check-circle mr-2 mt-0.5 text-green-500 text-xs"></i>
                  <span
                    ><strong>New Lifecycle Hooks:</strong> afterNextRender(), afterRender() for DOM
                    operations</span
                  >
                </li>
                <li class="flex items-start">
                  <i class="fas fa-check-circle mr-2 mt-0.5 text-green-500 text-xs"></i>
                  <span
                    ><strong>Improved SSR:</strong> Better hydration and non-destructive full app
                    hydration</span
                  >
                </li>
              </ul>
            </div>

            <!-- Version Notice -->
            <div class="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p class="text-sm text-yellow-800 flex items-center">
                <i class="fas fa-exclamation-triangle mr-2"></i>
                <strong>Note:</strong> Ensure you have Angular CLI v17+ installed:
                <code class="ml-2 bg-yellow-100 px-2 py-1 rounded text-xs"
                  >npm install -g @angular/cli@latest</code
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {}
