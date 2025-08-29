import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  template: `
  <div class="bg-gray-100 min-h-screen">
    <div class="container mx-auto px-4 py-8 max-w-7xl">
        <!-- Header -->
        <div class="text-center mb-8">
            <div class="flex items-center justify-center mb-4">
                <i class="fab fa-angular text-red-600 text-4xl mr-3"></i>
                <h1 class="text-4xl font-bold text-gray-800">Angular Command Generator</h1>
            </div>
            <p class="text-gray-600 text-lg">Generate optimized <code class="bg-gray-200 px-2 py-1 rounded">ng new</code> commands for Linux and Windows</p>
        </div>

        <div class="grid grid-cols-1  gap-8">
            <!-- Configuration Panel -->
            <div class="bg-white rounded-lg shadow-lg p-6">
                <div class="flex items-center mb-6">
                    <i class="fas fa-cogs text-blue-600 text-xl mr-2"></i>
                    <h2 class="text-2xl font-semibold text-gray-800">Configuration</h2>
                </div>

                <form id="configForm" class="space-y-6">
                    <!-- App Name -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            <i class="fas fa-tag mr-1"></i>
                            Application Name *
                        </label>
                        <input
                            type="text"
                            id="appName"
                            value="my-angular-app"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="my-angular-app"
                            required>
                    </div>

                    <!-- Directory -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            <i class="fas fa-folder mr-1"></i>
                            Directory (optional)
                        </label>
                        <input
                            type="text"
                            id="directory"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Leave empty for current directory">
                    </div>

                    <!-- Style Format -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            <i class="fas fa-paint-brush mr-1"></i>
                            Style Format
                        </label>
                        <select
                            id="style"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            <option value="css">CSS</option>
                            <option value="scss" selected>SCSS</option>
                            <option value="sass">Sass</option>
                            <option value="less">Less</option>
                        </select>
                    </div>

                    <!-- Package Manager -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            <i class="fas fa-box mr-1"></i>
                            Package Manager
                        </label>
                        <select
                            id="packageManager"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            <option value="">Default (npm)</option>
                            <option value="npm">npm</option>
                            <option value="yarn">yarn</option>
                            <option value="pnpm">pnpm</option>
                            <option value="bun">bun</option>
                            <option value="cnpm">cnpm</option>
                        </select>
                    </div>

                    <!-- AI Config -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            <i class="fas fa-robot mr-1"></i>
                            AI Tools Configuration
                        </label>
                        <select
                            id="aiConfig"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            <option value="">None</option>
                            <option value="claude">Claude</option>
                            <option value="copilot">GitHub Copilot</option>
                            <option value="cursor">Cursor</option>
                            <option value="gemini">Gemini</option>
                            <option value="jetbrains">JetBrains</option>
                            <option value="windsurf">Windsurf</option>
                        </select>
                    </div>

                    <!-- Collection -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            <i class="fas fa-layer-group mr-1"></i>
                            Schematics Collection
                        </label>
                        <input
                            type="text"
                            id="collection"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="@angular/material, @ngrx/schematics, etc.">
                    </div>

                    <!-- Prefix -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            <i class="fas fa-code mr-1"></i>
                            Component Prefix
                        </label>
                        <input
                            type="text"
                            id="prefix"
                            value="app"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="app">
                    </div>

                    <!-- View Encapsulation -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            <i class="fas fa-eye mr-1"></i>
                            View Encapsulation
                        </label>
                        <select
                            id="viewEncapsulation"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            <option value="">Default (Emulated)</option>
                            <option value="Emulated">Emulated</option>
                            <option value="None">None</option>
                            <option value="ShadowDom">ShadowDom</option>
                        </select>
                    </div>

                    <!-- New Project Root -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            <i class="fas fa-sitemap mr-1"></i>
                            New Project Root
                        </label>
                        <input
                            type="text"
                            id="newProjectRoot"
                            value="projects"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="projects">
                    </div>

                    <!-- Boolean Options -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="space-y-3">
                            <div class="flex items-center">
                                <input type="checkbox" id="routing" checked class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                                <label for="routing" class="ml-2 block text-sm text-gray-700 tooltip">
                                    <i class="fas fa-route mr-1"></i>
                                    Routing
                                    <span class="tooltiptext">Enable routing in the application</span>
                                </label>
                            </div>

                            <div class="flex items-center">
                                <input type="checkbox" id="standalone" checked class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                                <label for="standalone" class="ml-2 block text-sm text-gray-700 tooltip">
                                    <i class="fas fa-cube mr-1"></i>
                                    Standalone
                                    <span class="tooltiptext">Use standalone components (recommended)</span>
                                </label>
                            </div>

                            <div class="flex items-center">
                                <input type="checkbox" id="strict" checked class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                                <label for="strict" class="ml-2 block text-sm text-gray-700 tooltip">
                                    <i class="fas fa-shield-alt mr-1"></i>
                                    Strict Mode
                                    <span class="tooltiptext">Enable stricter type checking</span>
                                </label>
                            </div>

                            <div class="flex items-center">
                                <input type="checkbox" id="ssr" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                                <label for="ssr" class="ml-2 block text-sm text-gray-700 tooltip">
                                    <i class="fas fa-server mr-1"></i>
                                    SSR
                                    <span class="tooltiptext">Server-Side Rendering</span>
                                </label>
                            </div>

                            <div class="flex items-center">
                                <input type="checkbox" id="zoneless" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                                <label for="zoneless" class="ml-2 block text-sm text-gray-700 tooltip">
                                    <i class="fas fa-circle-notch mr-1"></i>
                                    Zoneless
                                    <span class="tooltiptext">Don't use zone.js</span>
                                </label>
                            </div>

                            <div class="flex items-center">
                                <input type="checkbox" id="commit" checked class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                                <label for="commit" class="ml-2 block text-sm text-gray-700 tooltip">
                                    <i class="fas fa-code-branch mr-1"></i>
                                    Initial Commit
                                    <span class="tooltiptext">Create initial Git commit</span>
                                </label>
                            </div>
                        </div>

                        <div class="space-y-3">
                            <div class="flex items-center">
                                <input type="checkbox" id="createApplication" checked class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                                <label for="createApplication" class="ml-2 block text-sm text-gray-700 tooltip">
                                    <i class="fas fa-plus-circle mr-1"></i>
                                    Create App
                                    <span class="tooltiptext">Create initial application</span>
                                </label>
                            </div>

                            <div class="flex items-center">
                                <input type="checkbox" id="interactive" checked class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                                <label for="interactive" class="ml-2 block text-sm text-gray-700 tooltip">
                                    <i class="fas fa-comments mr-1"></i>
                                    Interactive
                                    <span class="tooltiptext">Enable interactive prompts</span>
                                </label>
                            </div>

                            <div class="flex items-center">
                                <input type="checkbox" id="skipGit" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                                <label for="skipGit" class="ml-2 block text-sm text-gray-700 tooltip">
                                    <i class="fas fa-git-alt mr-1"></i>
                                    Skip Git
                                    <span class="tooltiptext">Don't initialize Git repository</span>
                                </label>
                            </div>

                            <div class="flex items-center">
                                <input type="checkbox" id="skipInstall" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                                <label for="skipInstall" class="ml-2 block text-sm text-gray-700 tooltip">
                                    <i class="fas fa-download mr-1"></i>
                                    Skip Install
                                    <span class="tooltiptext">Skip package installation</span>
                                </label>
                            </div>

                            <div class="flex items-center">
                                <input type="checkbox" id="skipTests" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                                <label for="skipTests" class="ml-2 block text-sm text-gray-700 tooltip">
                                    <i class="fas fa-vial mr-1"></i>
                                    Skip Tests
                                    <span class="tooltiptext">Skip test file generation</span>
                                </label>
                            </div>

                            <div class="flex items-center">
                                <input type="checkbox" id="minimal" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                                <label for="minimal" class="ml-2 block text-sm text-gray-700 tooltip">
                                    <i class="fas fa-minus-circle mr-1"></i>
                                    Minimal
                                    <span class="tooltiptext">Generate minimal workspace</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <!-- Advanced Options -->
                    <div class="border-t pt-4">
                        <h3 class="text-lg font-semibold text-gray-700 mb-3">
                            <i class="fas fa-sliders-h mr-1"></i>
                            Advanced Options
                        </h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="flex items-center">
                                <input type="checkbox" id="inlineStyle" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                                <label for="inlineStyle" class="ml-2 block text-sm text-gray-700 tooltip">
                                    <i class="fas fa-code mr-1"></i>
                                    Inline Style
                                    <span class="tooltiptext">Include styles in component files</span>
                                </label>
                            </div>

                            <div class="flex items-center">
                                <input type="checkbox" id="inlineTemplate" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                                <label for="inlineTemplate" class="ml-2 block text-sm text-gray-700 tooltip">
                                    <i class="fas fa-file-code mr-1"></i>
                                    Inline Template
                                    <span class="tooltiptext">Include templates in component files</span>
                                </label>
                            </div>

                            <div class="flex items-center">
                                <input type="checkbox" id="defaults" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                                <label for="defaults" class="ml-2 block text-sm text-gray-700 tooltip">
                                    <i class="fas fa-magic mr-1"></i>
                                    Use Defaults
                                    <span class="tooltiptext">Disable interactive prompts</span>
                                </label>
                            </div>

                            <div class="flex items-center">
                                <input type="checkbox" id="dryRun" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                                <label for="dryRun" class="ml-2 block text-sm text-gray-700 tooltip">
                                    <i class="fas fa-play mr-1"></i>
                                    Dry Run
                                    <span class="tooltiptext">Preview without creating files</span>
                                </label>
                            </div>

                            <div class="flex items-center">
                                <input type="checkbox" id="force" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                                <label for="force" class="ml-2 block text-sm text-gray-700 tooltip">
                                    <i class="fas fa-exclamation-triangle mr-1"></i>
                                    Force
                                    <span class="tooltiptext">Overwrite existing files</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <!-- Generated Commands -->
            <div class="bg-white rounded-lg shadow-lg p-6">
                <div class="flex items-center mb-6">
                    <i class="fas fa-terminal text-green-600 text-xl mr-2"></i>
                    <h2 class="text-2xl font-semibold text-gray-800">Generated Commands</h2>
                </div>

                <!-- Linux/macOS Command -->
                <div class="mb-6 slide-enter">
                    <div class="flex items-center justify-between mb-2">
                        <h3 class="text-lg font-medium text-gray-700 flex items-center">
                            <i class="fab fa-linux mr-2 text-blue-600"></i>
                            Linux / macOS
                        </h3>
                        <button
                            onclick="copyCommand('linuxCommand')"
                            class="flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <i class="fas fa-copy mr-1"></i>
                            Copy
                        </button>
                    </div>
                    <div class="bg-gray-900 text-green-400 p-4 rounded-lg">
                        <div class="flex items-start">
                            <span class="text-gray-500 mr-2">$</span>
                            <span id="linuxCommand" class="command-output flex-1 break-all">ng new my-angular-app</span>
                        </div>
                    </div>
                </div>

                <!-- Windows Command -->
                <div class="mb-6 slide-enter">
                    <div class="flex items-center justify-between mb-2">
                        <h3 class="text-lg font-medium text-gray-700 flex items-center">
                            <i class="fab fa-windows mr-2 text-blue-600"></i>
                            Windows
                        </h3>
                        <button
                            onclick="copyCommand('windowsCommand')"
                            class="flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <i class="fas fa-copy mr-1"></i>
                            Copy
                        </button>
                    </div>
                    <div class="bg-gray-900 text-green-400 p-4 rounded-lg">
                        <div class="flex items-start">
                            <span class="text-gray-500 mr-2">></span>
                            <span id="windowsCommand" class="command-output flex-1 break-all">ng new my-angular-app</span>
                        </div>
                    </div>
                </div>

                <!-- Additional Setup Commands -->
                <div id="additionalCommands" class="mb-6 slide-enter" style="display: none;">
                    <h3 class="text-lg font-medium text-gray-700 mb-2">
                        <i class="fas fa-plus mr-1"></i>
                        Additional Setup Commands
                    </h3>
                    <div class="space-y-2 text-sm">
                        <div id="tailwindSetup" class="bg-blue-50 p-3 rounded-md border border-blue-200">
                            <p class="font-medium text-blue-800 mb-1">Add Tailwind CSS:</p>
                            <code class="text-blue-700 text-xs">ng add @ngtw/tailwind</code>
                        </div>
                        <div id="cdkSetup" class="bg-purple-50 p-3 rounded-md border border-purple-200">
                            <p class="font-medium text-purple-800 mb-1">Add Angular CDK:</p>
                            <code class="text-purple-700 text-xs">ng add @angular/cdk</code>
                        </div>
                    </div>
                </div>

                <!-- Pro Tips -->
                <div class="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
                    <h4 class="font-medium text-blue-900 mb-3 flex items-center">
                        <i class="fas fa-lightbulb mr-2"></i>
                        Pro Tips
                    </h4>
                    <ul class="text-sm text-blue-800 space-y-2">
                        <li class="flex items-start">
                            <i class="fas fa-chevron-right mr-2 mt-0.5 text-xs"></i>
                            Install Angular CLI globally: <code class="bg-blue-100 px-2 py-1 rounded ml-1">npm install -g @angular/cli</code>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-chevron-right mr-2 mt-0.5 text-xs"></i>
                            Use <code class="bg-blue-100 px-1 rounded">--dry-run</code> to preview changes without creating files
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-chevron-right mr-2 mt-0.5 text-xs"></i>
                            The <code class="bg-blue-100 px-1 rounded">--standalone</code> option is recommended for modern Angular apps
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-chevron-right mr-2 mt-0.5 text-xs"></i>
                            Enable <code class="bg-blue-100 px-1 rounded">--strict</code> mode for better type safety and performance
                        </li>
                    </ul>
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
