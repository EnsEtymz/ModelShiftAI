import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChevronDown } from "lucide-react"

export function InputModelSelect() {
    const models = [
        { value: "openai-gpt-4", label: "OpenAI - GPT-4" },
        { value: "openai-gpt-3.5", label: "OpenAI - GPT-3.5" },
        { value: "anthropic-claude-3", label: "Anthropic - Claude 3" },
        { value: "mistral-small", label: "Mistral - Small" },
        { value: "mistral-medium", label: "Mistral - Medium" },
        { value: "cohere-command-r", label: "Cohere - Command R+" },
        { value: "google-gemini-1.5", label: "Google - Gemini 1.5" },
        { value: "groq-llama3-70b", label: "Groq - Llama 3 70B" },
        { value: "perplexity-llama3-70b", label: "Perplexity - Llama 3 70B" },
        { value: "meta-llama3-70b", label: "Meta - Llama 3 70B (API)" },
      ];
  return (
   <Select>
  <SelectTrigger className="rounded-none border-none shadow-none focus:ring-0 focus-visible:ring-0 h-full whitespace-nowrap">
    <SelectValue placeholder="Select a model" className="mr-4" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>AI Language Models</SelectLabel>
      {models.map((model) => (
        <SelectItem key={model.value} value={model.value}>
          {model.label}
        </SelectItem>
      ))}
    </SelectGroup>
  </SelectContent>
</Select>
  )
}
