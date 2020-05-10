template = File.read('whatsapp.template.js')

injects = Dir.entries('injects')[2..-1].map { |e| "// File: #{e}\n#{File.read(File.join('injects', e))}" }

out = File.open('whatsapp.js', 'w')
out.puts template.gsub('{{INJECT_CONTENT}}', injects.join("\n"))
out.close
