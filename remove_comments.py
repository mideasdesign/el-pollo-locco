#!/usr/bin/env python3
"""
Script to remove all non-JSDoc comments from JavaScript files.
Preserves /** ... */ JSDoc comments but removes // comments and /* ... */ regular comments.
"""

import os
import re
import sys

def remove_non_jsdoc_comments(content):
    """Remove all non-JSDoc comments from JavaScript content."""
    lines = content.split('\n')
    result_lines = []
    in_multiline_comment = False
    in_jsdoc_comment = False
    
    for line in lines:
        original_line = line
        
        # Handle multi-line JSDoc comments (/** ... */)
        if '/**' in line and '*/' in line:
            # Single line JSDoc comment - keep it
            result_lines.append(line)
            continue
        elif '/**' in line:
            # Start of JSDoc comment - keep it
            in_jsdoc_comment = True
            result_lines.append(line)
            continue
        elif in_jsdoc_comment and '*/' in line:
            # End of JSDoc comment - keep it
            in_jsdoc_comment = False
            result_lines.append(line)
            continue
        elif in_jsdoc_comment:
            # Inside JSDoc comment - keep it
            result_lines.append(line)
            continue
            
        # Handle regular multi-line comments (/* ... */)
        if '/*' in line and '*/' in line and '/**' not in line:
            # Single line regular comment - remove it
            before_comment = line[:line.find('/*')]
            after_comment = line[line.find('*/') + 2:]
            line = before_comment + after_comment
        elif '/*' in line and '/**' not in line:
            # Start of regular multi-line comment - remove from /* onwards
            in_multiline_comment = True
            line = line[:line.find('/*')]
        elif in_multiline_comment and '*/' in line:
            # End of regular multi-line comment - remove up to */
            in_multiline_comment = False
            line = line[line.find('*/') + 2:]
        elif in_multiline_comment:
            # Inside regular multi-line comment - skip line
            continue
            
        # Handle single line comments (//)
        if '//' in line:
            # Check if it's not inside a string
            in_string = False
            quote_char = None
            i = 0
            while i < len(line):
                char = line[i]
                if char in ['"', "'", '`'] and (i == 0 or line[i-1] != '\\'):
                    if not in_string:
                        in_string = True
                        quote_char = char
                    elif char == quote_char:
                        in_string = False
                        quote_char = None
                elif char == '/' and i < len(line) - 1 and line[i+1] == '/' and not in_string:
                    # Found // outside of string - remove from here
                    line = line[:i].rstrip()
                    break
                i += 1
        
        result_lines.append(line)
    
    return '\n'.join(result_lines)

def process_js_file(filepath):
    """Process a single JavaScript file to remove non-JSDoc comments."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Remove non-JSDoc comments
        cleaned_content = remove_non_jsdoc_comments(content)
        
        # Write back to file
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(cleaned_content)
        
        print(f"Processed: {filepath}")
        return True
    except Exception as e:
        print(f"Error processing {filepath}: {e}")
        return False

def main():
    js_dir = "/Users/markusfischer/Sites/el-pollo-loco/assets/js"
    
    if not os.path.exists(js_dir):
        print(f"Directory not found: {js_dir}")
        return
    
    # Find all .js files recursively
    js_files = []
    for root, dirs, files in os.walk(js_dir):
        for file in files:
            if file.endswith('.js'):
                js_files.append(os.path.join(root, file))
    
    print(f"Found {len(js_files)} JavaScript files to process")
    
    processed = 0
    failed = 0
    
    for js_file in js_files:
        if process_js_file(js_file):
            processed += 1
        else:
            failed += 1
    
    print(f"\nCompleted: {processed} files processed, {failed} failed")

if __name__ == "__main__":
    main()
