# Requirements Document

## Introduction

This specification addresses the 404 errors occurring when users click on effects cards from the homepage and effects listing pages. The root cause is inconsistent URL formats across different locale configuration files, where some URLs use incorrect slugs that don't match the canonical tool definitions in `tools.ts`.

## Glossary

- **Tool**: A category of AI effects (e.g., AI Kissing, AI Muscle) with a unique slug identifier
- **Effect**: A specific variant within a tool (e.g., "French Kiss" is an effect type within the AI Kissing tool)
- **Slug**: A URL-safe identifier in kebab-case format (e.g., "ai-kissing")
- **Effect_Type**: A query parameter specifying which effect variant to display (e.g., ?type=法式接吻)
- **Locale_Config**: JSON configuration files containing page content for different languages
- **Tools_Registry**: The `src/data/tools.ts` file that defines all canonical tool slugs

## Requirements

### Requirement 1: URL Format Standardization

**User Story:** As a user, I want to click on any effects card and be taken to the correct detail page, so that I can use the effect without encountering 404 errors.

#### Acceptance Criteria

1. WHEN a user clicks on a video effect card, THE System SHALL navigate to `/video-effects/{slug}` or `/video-effects/{slug}?type={effect_type}`
2. WHEN a user clicks on a photo effect card, THE System SHALL navigate to `/photo-effects/{slug}` or `/photo-effects/{slug}?type={effect_type}`
3. THE System SHALL use only slugs that are defined in the Tools_Registry
4. WHEN an effect has multiple variants, THE System SHALL include the type parameter in the URL
5. THE System SHALL NOT use mixed language characters in URL paths (e.g., no "aikissing法式接吻")

### Requirement 2: Tools Registry Validation

**User Story:** As a developer, I want all tools referenced in configuration files to exist in the tools registry, so that the system maintains data consistency.

#### Acceptance Criteria

1. WHEN the system processes a locale configuration file, THE System SHALL validate that all referenced tool slugs exist in Tools_Registry
2. WHEN a tool slug is missing from Tools_Registry, THE System SHALL identify it during validation
3. THE Tools_Registry SHALL contain all tools referenced in homepage and effects listing pages
4. THE Tools_Registry SHALL correctly categorize each tool as either 'video' or 'photo' type
5. WHEN a new tool is added to configuration files, THE System SHALL require a corresponding entry in Tools_Registry

### Requirement 3: Homepage Effects Configuration Correction

**User Story:** As a user browsing the homepage, I want all effects cards to link to valid pages, so that I can explore effects without encountering errors.

#### Acceptance Criteria

1. WHEN the homepage displays video effects, THE System SHALL use URLs matching the format `/video-effects/{slug}?type={effect_type}`
2. WHEN the homepage displays photo effects, THE System SHALL use URLs matching the format `/photo-effects/{slug}?type={effect_type}`
3. THE System SHALL apply URL corrections to both English and Chinese locale configurations
4. WHEN an effect card URL is corrected, THE System SHALL preserve the effect type information
5. THE System SHALL ensure all homepage effect URLs use slugs from Tools_Registry

### Requirement 4: Effects Listing Pages Configuration Correction

**User Story:** As a user browsing effects listing pages, I want all effect cards to link correctly, so that I can access any effect from the catalog.

#### Acceptance Criteria

1. WHEN the photo-effects page displays effect cards, THE System SHALL use URLs with slugs from Tools_Registry
2. WHEN the video-effects page displays effect cards, THE System SHALL use URLs with slugs from Tools_Registry
3. THE System SHALL correct any malformed URLs in effects listing configurations
4. WHEN multiple effects share the same tool, THE System SHALL use the same base slug with different type parameters
5. THE System SHALL maintain consistency between English and Chinese locale configurations

### Requirement 5: Missing Tools Identification and Addition

**User Story:** As a developer, I want to identify and add any missing tool definitions, so that all effects have proper tool registry entries.

#### Acceptance Criteria

1. WHEN analyzing configuration files, THE System SHALL identify tools referenced but not defined in Tools_Registry
2. WHEN a missing tool is identified, THE System SHALL determine its correct type (video or photo)
3. THE System SHALL add missing tool definitions to Tools_Registry with appropriate metadata
4. WHEN adding a tool, THE System SHALL include all effect variants found in configuration files
5. THE System SHALL ensure new tool entries follow the existing data structure pattern

### Requirement 6: URL Slug Mapping Consistency

**User Story:** As a system, I want consistent slug mapping across all configuration files, so that the same tool always uses the same URL.

#### Acceptance Criteria

1. WHEN the same tool appears in multiple configuration files, THE System SHALL use identical slugs
2. WHEN the same effect appears in multiple locales, THE System SHALL use the same slug with locale-appropriate type parameters
3. THE System SHALL map Chinese tool names to their English slug equivalents consistently
4. WHEN a tool has both video and photo variants, THE System SHALL use distinct slugs (e.g., "ai-kissing" vs "ai-kissing-photo")
5. THE System SHALL document the mapping between display names and slugs

### Requirement 7: Configuration File Validation

**User Story:** As a developer, I want automated validation of configuration files, so that URL errors are caught before deployment.

#### Acceptance Criteria

1. WHEN configuration files are modified, THE System SHALL validate all effect URLs
2. WHEN an invalid slug is detected, THE System SHALL report the file location and incorrect value
3. THE System SHALL verify that video effect URLs use the /video-effects/ path
4. THE System SHALL verify that photo effect URLs use the /photo-effects/ path
5. WHEN validation fails, THE System SHALL provide actionable error messages with correction suggestions

### Requirement 8: Type Parameter Handling

**User Story:** As a user, I want to be directed to the specific effect variant I clicked on, so that I see the exact effect I selected.

#### Acceptance Criteria

1. WHEN an effect has multiple variants, THE System SHALL include a type query parameter in the URL
2. WHEN the type parameter contains non-ASCII characters, THE System SHALL properly URL-encode it
3. THE System SHALL preserve the original effect type names from configuration files
4. WHEN a user navigates to an effect URL with a type parameter, THE System SHALL display that specific variant
5. WHEN a tool has only one effect variant, THE System MAY omit the type parameter

## Notes

- The primary source of truth for tool slugs is `src/data/tools.ts`
- Configuration files to be corrected:
  - `src/config/locale/messages/en/pages/index.json`
  - `src/config/locale/messages/zh/pages/index.json`
  - `src/config/locale/messages/en/pages/photo-effects.json`
  - `src/config/locale/messages/en/pages/video-effects.json`
  - Corresponding Chinese versions if they exist
- URL format examples:
  - Correct: `/video-effects/ai-kissing?type=法式接吻`
  - Incorrect: `/video-effects/aikissing法式接吻`
  - Incorrect: `/video-effects/ai-kissing-法式接吻`
