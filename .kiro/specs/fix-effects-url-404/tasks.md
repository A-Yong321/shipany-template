# Implementation Plan: Fix Effects URL 404 Errors

## Overview

This implementation plan addresses the 404 errors by creating validation and correction scripts that ensure all effect URLs in configuration files use correct slugs from the tools registry. The approach is incremental: first validate to identify issues, then correct URLs, then add missing tools, and finally verify the fixes.

## Tasks

- [x] 1. Set up script infrastructure and utilities
  - Create scripts directory structure: `scripts/fix-effects-urls/`
  - Create configuration file with paths to all locale files and tools registry
  - Implement file I/O utilities for reading/writing JSON files
  - Implement backup utilities for creating timestamped backups
  - Set up logging utilities with timestamp and severity levels
  - _Requirements: 7.1, 7.2_

- [ ] 2. Implement URL parsing and validation utilities
  - [x] 2.1 Create URL parser module
    - Parse effect URLs to extract path prefix, slug, and query parameters
    - Handle URL-encoded characters in query parameters
    - Extract type parameter from query string
    - _Requirements: 1.1, 1.2, 8.2_
  
  - [ ]* 2.2 Write property test for URL parser
    - **Property 4: URL Paths Contain Only ASCII Characters**
    - **Validates: Requirements 1.5**
  
  - [x] 2.3 Create slug matcher module
    - Implement exact slug matching against tools registry
    - Implement fuzzy matching for common misspellings
    - Map Chinese display names to English slugs
    - _Requirements: 1.3, 6.3_
  
  - [ ]* 2.4 Write property test for slug matcher
    - **Property 2: All Slugs Exist in Registry**
    - **Validates: Requirements 1.3**

- [ ] 3. Implement validation script
  - [x] 3.1 Create validation engine
    - Load tools registry and build slug index
    - Traverse JSON configuration files to find all effect URLs
    - Validate each URL against format rules and registry
    - Collect validation errors with file path and JSON path
    - _Requirements: 2.1, 7.2_
  
  - [ ]* 3.2 Write property test for validation
    - **Property 1: URL Format Matches Tool Type**
    - **Validates: Requirements 1.1, 1.2**
  
  - [ ]* 3.3 Write property test for registry validation
    - **Property 5: Registry Validation Completeness**
    - **Validates: Requirements 2.1, 2.3**
  
  - [-] 3.4 Create validation report generator
    - Format validation errors into readable report
    - Group errors by file and error type
    - Include suggested fixes for each error
    - Generate summary statistics
    - _Requirements: 7.2, 7.5_
  
  - [ ]* 3.5 Write unit tests for validation edge cases
    - Test handling of missing files
    - Test handling of invalid JSON
    - Test handling of deeply nested effect items
    - _Requirements: 7.2_

- [ ] 4. Checkpoint - Run validation on actual files
  - Run validation script on all configuration files
  - Review validation report
  - Ensure all issues are detected
  - Ask user if questions arise

- [ ] 5. Implement URL correction script
  - [ ] 5.1 Create correction engine
    - Load tools registry and build slug mappings
    - For each invalid URL, determine correct slug
    - Reconstruct URL with correct format
    - Preserve effect type information
    - Support dry-run mode for preview
    - _Requirements: 1.1, 1.2, 1.3, 3.4_
  
  - [ ]* 5.2 Write property test for type preservation
    - **Property 7: Type Information Preservation**
    - **Validates: Requirements 3.4**
  
  - [ ]* 5.3 Write property test for slug consistency
    - **Property 8: Same Tool Same Slug**
    - **Validates: Requirements 4.4, 6.1, 6.2**
  
  - [ ] 5.4 Implement correction report generator
    - Show before/after for each correction
    - Group corrections by file
    - Include reason for each correction
    - Generate summary statistics
    - _Requirements: 3.3, 4.3_
  
  - [ ]* 5.5 Write unit tests for correction scenarios
    - Test correcting mixed-language URLs
    - Test preserving type parameters
    - Test handling single-variant tools
    - Test handling missing type parameters
    - _Requirements: 1.5, 3.4, 8.3_

- [ ] 6. Implement missing tools detection script
  - [ ] 6.1 Create missing tools detector
    - Extract all tool references from configuration files
    - Compare against tools registry
    - Infer tool type from URL path
    - Collect all effect variants for each missing tool
    - Track which files reference each missing tool
    - _Requirements: 5.1, 5.2, 5.4_
  
  - [ ]* 6.2 Write property test for type inference
    - **Property 10: Type Inference from URL Path**
    - **Validates: Requirements 5.2**
  
  - [ ]* 6.3 Write property test for variant collection
    - **Property 11: Complete Variant Collection**
    - **Validates: Requirements 5.4**
  
  - [ ] 6.4 Create missing tools report generator
    - List each missing tool with inferred metadata
    - Show all effect variants found
    - List files that reference the tool
    - Suggest tool definition structure
    - _Requirements: 5.1, 5.2_

- [ ] 7. Implement tool addition script
  - [ ] 7.1 Create tool addition engine
    - Generate tool definitions from missing tools report
    - Ensure all required fields are present
    - Follow existing tool structure pattern
    - Insert new tools into tools.ts in appropriate location
    - Preserve TypeScript formatting
    - _Requirements: 5.3, 5.5_
  
  - [ ]* 7.2 Write property test for schema compliance
    - **Property 12: Schema Compliance for New Tools**
    - **Validates: Requirements 5.5**
  
  - [ ]* 7.3 Write unit tests for tool addition
    - Test generating tool from missing tool data
    - Test inserting tool into tools array
    - Test preserving TypeScript syntax
    - _Requirements: 5.3, 5.5_

- [ ] 8. Checkpoint - Review and execute corrections
  - Run correction script in dry-run mode
  - Review proposed corrections
  - Run correction script to apply changes
  - Run missing tools detection
  - Review missing tools report
  - Ensure all tests pass, ask the user if questions arise

- [ ] 9. Implement cross-file consistency validation
  - [ ] 9.1 Create consistency checker
    - Build index of all tools across all configuration files
    - Verify same tool uses same slug everywhere
    - Verify same effect uses same slug across locales
    - Verify video/photo variants have distinct slugs
    - _Requirements: 4.4, 4.5, 6.1, 6.2, 6.4_
  
  - [ ]* 9.2 Write property test for cross-locale consistency
    - **Property 9: Cross-Locale Slug Consistency**
    - **Validates: Requirements 4.5**
  
  - [ ]* 9.3 Write property test for distinct video/photo slugs
    - **Property 14: Distinct Slugs for Video and Photo Variants**
    - **Validates: Requirements 6.4**

- [ ] 10. Implement URL encoding validation
  - [ ] 10.1 Create URL encoding checker
    - Check all type parameters for non-ASCII characters
    - Verify non-ASCII characters are properly URL-encoded
    - Report any unencoded non-ASCII characters
    - _Requirements: 8.2_
  
  - [ ]* 10.2 Write property test for URL encoding
    - **Property 15: Non-ASCII Type Parameters Are URL-Encoded**
    - **Validates: Requirements 8.2**

- [ ] 11. Create main execution script
  - [ ] 11.1 Implement orchestration script
    - Create backups of all files before modifications
    - Run validation and generate report
    - Run corrections (with user confirmation)
    - Run missing tools detection
    - Add missing tools (with user confirmation)
    - Run final validation to verify fixes
    - Generate summary report
    - _Requirements: 3.3, 4.3, 5.3_
  
  - [ ]* 11.2 Write integration tests
    - Test end-to-end validation workflow
    - Test end-to-end correction workflow
    - Test end-to-end tool addition workflow
    - Test rollback functionality
    - _Requirements: 3.3, 4.3, 5.3_

- [ ] 12. Execute fixes and verify
  - [ ] 12.1 Run main execution script
    - Create backups
    - Execute validation
    - Execute corrections
    - Add missing tools if needed
    - Verify all issues resolved
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_
  
  - [ ] 12.2 Manual verification
    - Test homepage effect cards in browser
    - Test photo-effects page cards
    - Test video-effects page cards
    - Test both English and Chinese locales
    - Verify no 404 errors
    - _Requirements: 1.1, 1.2, 3.1, 3.2, 4.1, 4.2_

- [ ] 13. Final checkpoint - Ensure all tests pass
  - Run all property-based tests
  - Run all unit tests
  - Run all integration tests
  - Verify manual testing results
  - Ensure all tests pass, ask the user if questions arise

## Notes

- All scripts should be written in TypeScript for consistency with the project
- Use Node.js for script execution
- Configuration files are in JSON format
- Tools registry is in TypeScript format
- All scripts should support dry-run mode for safety
- Create backups before any modifications
- Property-based tests should run minimum 100 iterations
- Each property test must reference its design document property number
- Focus on data integrity - tools.ts is the source of truth
