# frozen_string_literal: true

# Convert all inline markdown links to reference links.
# How to use:
#   ruby convert_reference_links.rb <input path>
#   ruby convert_reference_links.rb <input path> <output path>

path = File.expand_path(ARGV[0])
text = File.read(path)

# Generate link-index pairs, like [[link1, 0], [link2, 1], ...]
links = text.scan(/\[.+\]\((\S+)\)/).map(&:first).uniq.map.with_index.to_a

# Replace all links with their respective index
links.each do |href, index|
  text = text.gsub(/(\[.+\])\(#{href}\)/, "\\1[#{index}]")
end

# Append reference links to the end of the text
links.sort_by(&:last).each do |href, index|
  text += "\n[#{index}]: #{href}"
end

File.write(ARGV[1] || path, text)
