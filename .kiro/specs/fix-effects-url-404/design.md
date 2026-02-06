# Design Document: Fix Effects URL 404 Errors

## Overview

This design addresses the 404 errors occurring when users navigate from effects cards to detail pages. The solution involves:

1. Creating a validation script to identify URL mismatches between locale configurations and the tools registry
2. Implementing automated URL correction across all locale configuration files
3. Adding missing tool definitions to the tools registry
4. Establishing a validation mechanism to prevent future URL inconsistencies

The approach prioritizes data integrity by treating `tools.ts` as the single source of truth for all tool slugs.

## Architecture

### System Components

```
┌─────────────────────────────────────────────────────────────┐
│                     Configuration Layer                      │
├─────────────────────────────────────────────────────────────┤
│  • en/pages/index.json                                      │
│  • zh/pages/index.json                                      │
│  • en/pages/photo-effects.json                              │
│  • en/pages/video-effects.json                              │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ References
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Tools Registry (Source of Truth)          │
├─────────────────────────────────────────────────────────────┤
│  src/data/tools.ts                                          │
│  • Defines canonical slugs                                   │
│  • Maps tools to types (video/photo)                        │
│  • Contains effect variants                                  │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ Used by
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Validation & Correction                   │
├─────────────────────────────────────────────────────────────┤
│  • URL Validator Script                                      │
│  • URL Corrector Script                                      │
│  • Missing Tools Detector                                    │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **Validation Phase**:
   - Read all locale configuration files
   - Extract effect URLs from each file
   - Compare URLs against tools registry
   - Report mismatches and missing tools

2. **Correction Phase**:
   - For each incorrect URL, determine the correct slug from tools registry
   - Preserve effect type information
   - Update configuration files with corrected URLs
   - Verify corrections

3. **Addition Phase**:
   - Identify tools referenced in configs but missing from registry
   - Determine tool type (video/photo) from URL path
   - Add missing tool definitions to tools.ts

## Components and Interfaces

### 1. URL Validator

**Purpose**: Validate that all effect URLs in configuration files use correct slugs from the tools registry.

**Interface**:
```typescript
interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

interface ValidationError {
  file: string;
  path: string; // JSON path to the error
  currentUrl: string;
  issue: string;
  suggestedFix?: string;
}

interface ValidationWarning {
  file: string;
  message: string;
}

function validateConfigFiles(configPaths: string[]): ValidationResult;
```

**Validation Rules**:
- URL must start with `/video-effects/` or `/photo-effects/`
- Slug portion must exist in tools registry
- Slug must match the tool type (video tools use /video-effects/, photo tools use /photo-effects/)
- No mixed language characters in slug (e.g., no Chinese characters in path)
- Type parameter (if present) should be URL-encoded if it contains non-ASCII characters

### 2. URL Corrector

**Purpose**: Automatically correct malformed URLs in configuration files.

**Interface**:
```typescript
interface CorrectionResult {
  file: string;
  corrections: Correction[];
  success: boolean;
}

interface Correction {
  path: string; // JSON path
  oldUrl: string;
  newUrl: string;
  reason: string;
}

function correctConfigFile(filePath: string, dryRun: boolean): CorrectionResult;
```

**Correction Strategy**:
1. Parse the configuration file as JSON
2. Traverse all effect items
3. For each URL:
   - Extract the slug portion
   - Find matching tool in registry (fuzzy match if needed)
   - Reconstruct URL with correct slug
   - Preserve or add type parameter if effect has variants
4. Write corrected JSON back to file (if not dry run)

### 3. Missing Tools Detector

**Purpose**: Identify tools referenced in configurations but not defined in tools registry.

**Interface**:
```typescript
interface MissingTool {
  displayName: string;
  inferredSlug: string;
  type: 'video' | 'photo';
  referencedIn: string[]; // List of config files
  effectVariants: string[]; // Effect types found
}

function detectMissingTools(configPaths: string[]): MissingTool[];
```

**Detection Logic**:
- Extract all unique tool references from config files
- Compare against tools registry
- For missing tools:
  - Infer slug from URL or display name
  - Determine type from URL path (/video-effects/ or /photo-effects/)
  - Collect all effect variants
  - Track which files reference the tool

### 4. Slug Mapper

**Purpose**: Provide consistent mapping between display names and slugs.

**Interface**:
```typescript
interface SlugMapping {
  displayName: string;
  slug: string;
  type: 'video' | 'photo';
  aliases: string[]; // Alternative names
}

function getSlugForDisplayName(displayName: string, type: 'video' | 'photo'): string | null;
function getAllMappings(): SlugMapping[];
```

**Mapping Strategy**:
- Build mapping from tools registry
- Support fuzzy matching for display names
- Handle both English and Chinese names
- Provide aliases for common variations

## Data Models

### Tool Configuration (from tools.ts)

```typescript
interface Tool {
  slug: string;           // Canonical URL slug (e.g., "ai-kissing")
  title: string;          // Display title
  type: 'video' | 'photo'; // Tool type
  items: ToolItem[];      // Effect variants
}

interface ToolItem {
  title: string;          // Effect variant name (e.g., "法式接吻")
  originalSrc: string;    // Before image path
  effectSrc: string;      // After image path
  videoSrc?: string;      // Video path (optional)
  badge?: string;         // Badge text (e.g., "HOT", "NEW")
}
```

### Effect Card Configuration (from locale files)

```typescript
interface EffectCard {
  id?: string;            // Tool identifier (may be incorrect)
  title: string;          // Display title
  image: ImageConfig;     // Image configuration
  video?: string;         // Video path
  badge?: string | null;  // Badge text
  count?: string;         // Usage count
  url: string;            // Navigation URL (needs correction)
  beforeImage?: ImageConfig; // Before image (photo effects)
}

interface ImageConfig {
  src: string;
  alt: string;
}
```

### URL Structure

```
Correct Format:
  /video-effects/{slug}
  /video-effects/{slug}?type={effect_type}
  /photo-effects/{slug}
  /photo-effects/{slug}?type={effect_type}

Examples:
  ✓ /video-effects/ai-kissing?type=法式接吻
  ✓ /photo-effects/ai-kissing-photo?type=正常接吻
  ✗ /video-effects/aikissing法式接吻
  ✗ /video-effects/ai-kissing-法式接吻
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

Now I need to use the prework tool to analyze the acceptance criteria before writing the correctness properties.


### Property 1: URL Format Matches Tool Type
*For any* effect card configuration, the URL path SHALL match the tool's type: video effects SHALL use `/video-effects/{slug}` and photo effects SHALL use `/photo-effects/{slug}`, optionally followed by `?type={effect_type}`
**Validates: Requirements 1.1, 1.2**

### Property 2: All Slugs Exist in Registry
*For any* effect URL in configuration files, the slug portion SHALL exist as a tool slug in the Tools_Registry
**Validates: Requirements 1.3**

### Property 3: Multi-Variant Effects Include Type Parameter
*For any* tool with multiple effect variants, all URLs referencing that tool SHALL include a type query parameter specifying which variant
**Validates: Requirements 1.4**

### Property 4: URL Paths Contain Only ASCII Characters
*For any* effect URL, the path portion (before the query string) SHALL contain only ASCII characters (no Chinese or other non-ASCII characters)
**Validates: Requirements 1.5**

### Property 5: Registry Validation Completeness
*For any* configuration file, validation SHALL identify all tool slugs that are referenced but not defined in Tools_Registry
**Validates: Requirements 2.1, 2.3**

### Property 6: Tool Type Consistency
*For any* tool in Tools_Registry, its type field SHALL match the URL path prefix used in all configuration files that reference it (video tools use /video-effects/, photo tools use /photo-effects/)
**Validates: Requirements 2.4**

### Property 7: Type Information Preservation
*For any* URL correction, if the original URL contained effect type information (either in path or query parameter), the corrected URL SHALL preserve that type information in the query parameter
**Validates: Requirements 3.4**

### Property 8: Same Tool Same Slug
*For any* tool referenced in multiple configuration files or multiple locations, all references SHALL use the identical slug
**Validates: Requirements 4.4, 6.1, 6.2**

### Property 9: Cross-Locale Slug Consistency
*For any* effect that appears in both English and Chinese locale configurations, both SHALL use the same slug (though type parameter values may differ by locale)
**Validates: Requirements 4.5**

### Property 10: Type Inference from URL Path
*For any* tool being added to the registry, its type SHALL be correctly inferred as 'video' if referenced URLs use /video-effects/ or 'photo' if referenced URLs use /photo-effects/
**Validates: Requirements 5.2**

### Property 11: Complete Variant Collection
*For any* tool being added to the registry, all distinct effect type values found in configuration files SHALL be included in the tool's items array
**Validates: Requirements 5.4**

### Property 12: Schema Compliance for New Tools
*For any* tool added to Tools_Registry, it SHALL conform to the Tool interface with all required fields (slug, title, type, items)
**Validates: Requirements 5.5**

### Property 13: Chinese Name Mapping Consistency
*For any* Chinese tool name, it SHALL always map to the same English slug across all configuration files
**Validates: Requirements 6.3**

### Property 14: Distinct Slugs for Video and Photo Variants
*For any* tool that exists in both video and photo forms, the video variant and photo variant SHALL have distinct slugs (e.g., "ai-kissing" vs "ai-kissing-photo")
**Validates: Requirements 6.4**

### Property 15: Non-ASCII Type Parameters Are URL-Encoded
*For any* URL with a type query parameter containing non-ASCII characters, the parameter value SHALL be properly URL-encoded
**Validates: Requirements 8.2**

### Property 16: Type Name Preservation
*For any* effect type name in the original configuration, the correction process SHALL preserve the exact type name without modification
**Validates: Requirements 8.3**

### Property 17: Single-Variant Type Parameter Optional
*For any* tool with exactly one effect variant, URLs referencing that tool MAY omit the type query parameter
**Validates: Requirements 8.5**

## Error Handling

### Validation Errors

1. **Missing Slug Error**
   - Condition: URL references a slug not in tools registry
   - Response: Report file, path, and suggest closest matching slug
   - Recovery: Manual review or fuzzy match correction

2. **Type Mismatch Error**
   - Condition: Video tool used with /photo-effects/ path or vice versa
   - Response: Report mismatch and correct tool type
   - Recovery: Update URL path to match tool type

3. **Malformed URL Error**
   - Condition: URL doesn't match expected format
   - Response: Report current URL and suggest corrected format
   - Recovery: Reconstruct URL using tool slug and type parameter

4. **Mixed Language Error**
   - Condition: URL path contains non-ASCII characters
   - Response: Report problematic URL and identify non-ASCII characters
   - Recovery: Extract type information, move to query parameter

### Correction Errors

1. **File Read/Write Error**
   - Condition: Cannot read or write configuration file
   - Response: Log error with file path and permissions info
   - Recovery: Skip file and continue with others

2. **JSON Parse Error**
   - Condition: Configuration file is not valid JSON
   - Response: Report file and parse error location
   - Recovery: Skip file, require manual fix

3. **Ambiguous Slug Match**
   - Condition: Multiple tools could match a malformed URL
   - Response: Report ambiguity and list candidates
   - Recovery: Require manual selection or use most similar match

### Addition Errors

1. **Duplicate Slug Error**
   - Condition: Attempting to add tool with existing slug
   - Response: Report conflict and existing tool details
   - Recovery: Use existing tool or choose different slug

2. **Invalid Tool Data Error**
   - Condition: Missing required fields for new tool
   - Response: Report missing fields
   - Recovery: Collect missing data from configuration files or require manual input

## Testing Strategy

### Unit Tests

Unit tests will focus on specific examples and edge cases:

1. **URL Parsing Tests**
   - Test parsing valid video effect URLs
   - Test parsing valid photo effect URLs
   - Test parsing URLs with type parameters
   - Test parsing URLs with URL-encoded type parameters
   - Test handling malformed URLs

2. **Slug Matching Tests**
   - Test exact slug matches
   - Test fuzzy slug matching for common misspellings
   - Test Chinese name to slug mapping
   - Test handling of missing slugs

3. **Correction Logic Tests**
   - Test correcting mixed-language URLs
   - Test preserving type information
   - Test handling URLs without type parameters
   - Test handling tools with single variants

4. **File Operations Tests**
   - Test reading JSON configuration files
   - Test writing corrected JSON files
   - Test handling file permission errors
   - Test handling invalid JSON

### Property-Based Tests

Property-based tests will verify universal properties across all inputs. Each test should run a minimum of 100 iterations.

1. **Property Test: URL Format Validation**
   - **Property 1: URL Format Matches Tool Type**
   - Generate: Random effect cards with various tool types
   - Verify: All video effects use /video-effects/, all photo effects use /photo-effects/
   - Tag: `Feature: fix-effects-url-404, Property 1: URL Format Matches Tool Type`

2. **Property Test: Slug Registry Membership**
   - **Property 2: All Slugs Exist in Registry**
   - Generate: Random URLs from configuration files
   - Verify: Every extracted slug exists in tools registry
   - Tag: `Feature: fix-effects-url-404, Property 2: All Slugs Exist in Registry`

3. **Property Test: Type Parameter Presence**
   - **Property 3: Multi-Variant Effects Include Type Parameter**
   - Generate: Random tools with varying numbers of variants
   - Verify: Tools with >1 variant have type parameter in URLs
   - Tag: `Feature: fix-effects-url-404, Property 3: Multi-Variant Effects Include Type Parameter`

4. **Property Test: ASCII Path Characters**
   - **Property 4: URL Paths Contain Only ASCII Characters**
   - Generate: Random effect URLs
   - Verify: Path portion contains only ASCII characters
   - Tag: `Feature: fix-effects-url-404, Property 4: URL Paths Contain Only ASCII Characters`

5. **Property Test: Type Preservation**
   - **Property 7: Type Information Preservation**
   - Generate: Random URLs with type information
   - Apply: Correction function
   - Verify: Type information is preserved in output
   - Tag: `Feature: fix-effects-url-404, Property 7: Type Information Preservation`

6. **Property Test: Slug Consistency**
   - **Property 8: Same Tool Same Slug**
   - Generate: Random tool references across multiple files
   - Verify: All references to same tool use identical slug
   - Tag: `Feature: fix-effects-url-404, Property 8: Same Tool Same Slug`

7. **Property Test: Cross-Locale Consistency**
   - **Property 9: Cross-Locale Slug Consistency**
   - Generate: Random effects in multiple locales
   - Verify: Same effect uses same slug across locales
   - Tag: `Feature: fix-effects-url-404, Property 9: Cross-Locale Slug Consistency`

8. **Property Test: URL Encoding**
   - **Property 15: Non-ASCII Type Parameters Are URL-Encoded**
   - Generate: Random type parameters with non-ASCII characters
   - Verify: All non-ASCII characters are properly URL-encoded
   - Tag: `Feature: fix-effects-url-404, Property 15: Non-ASCII Type Parameters Are URL-Encoded`

### Integration Tests

1. **End-to-End Validation Test**
   - Run validation on all actual configuration files
   - Verify all errors are detected
   - Verify error messages are actionable

2. **End-to-End Correction Test**
   - Create test configuration files with known errors
   - Run correction script
   - Verify all URLs are corrected
   - Verify JSON structure is preserved
   - Verify no data loss

3. **End-to-End Addition Test**
   - Create test configuration with missing tools
   - Run detection and addition scripts
   - Verify missing tools are identified
   - Verify tools are added with correct structure
   - Verify tools.ts remains valid TypeScript

### Manual Testing

1. **Visual Verification**
   - Navigate to homepage in browser
   - Click each effect card
   - Verify no 404 errors
   - Verify correct effect is displayed

2. **Cross-Browser Testing**
   - Test URL navigation in Chrome, Firefox, Safari
   - Verify URL encoding works correctly
   - Verify type parameters are parsed correctly

3. **Locale Testing**
   - Switch between English and Chinese locales
   - Verify all effect cards work in both locales
   - Verify type parameters display correctly

## Implementation Notes

### Script Organization

```
scripts/
  fix-effects-urls/
    validate.ts          # Validation script
    correct.ts           # Correction script
    detect-missing.ts    # Missing tools detection
    add-tools.ts         # Add missing tools to registry
    utils/
      url-parser.ts      # URL parsing utilities
      slug-matcher.ts    # Slug matching logic
      file-utils.ts      # File I/O utilities
```

### Execution Order

1. Run validation script to identify all issues
2. Review validation report
3. Run correction script (dry-run first)
4. Review proposed corrections
5. Run correction script (actual)
6. Run missing tools detection
7. Review missing tools report
8. Run add-tools script or manually add tools
9. Run validation again to verify all issues resolved
10. Manual testing

### Configuration

Create a configuration file for the scripts:

```typescript
// scripts/fix-effects-urls/config.ts
export const config = {
  toolsRegistryPath: 'src/data/tools.ts',
  configFiles: [
    'src/config/locale/messages/en/pages/index.json',
    'src/config/locale/messages/zh/pages/index.json',
    'src/config/locale/messages/en/pages/photo-effects.json',
    'src/config/locale/messages/en/pages/video-effects.json',
  ],
  backupDir: 'scripts/fix-effects-urls/backups',
  reportDir: 'scripts/fix-effects-urls/reports',
};
```

### Backup Strategy

Before making any changes:
1. Create timestamped backup of all configuration files
2. Create backup of tools.ts
3. Store backups in dedicated directory
4. Provide rollback script if needed

### Logging

All scripts should log:
- Start time and end time
- Files processed
- Errors encountered
- Corrections made
- Summary statistics

Log format:
```
[2024-01-15 10:30:45] INFO: Starting validation
[2024-01-15 10:30:46] INFO: Processing en/pages/index.json
[2024-01-15 10:30:46] ERROR: Invalid slug 'aikissing法式接吻' at path 'sections.effects.tabs[0].items[0].url'
[2024-01-15 10:30:47] INFO: Validation complete. Found 23 errors in 4 files.
```
