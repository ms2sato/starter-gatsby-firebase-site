import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form"
import { FormLabel } from "@/components/Form/FormLabel/FormLabel"
import { Input } from "@/components/Form/Input/Input"
import { Textarea } from "@/components/Form/Textarea/Textarea"
import { FormAlert } from "@/components/Form/FormAlert/FormAlert"
import {
  Select,
  SelectContent,
  SelectItem
} from "@/components/Form/Select/Select"
import { Checkbox } from "@/components/Form/Checkbox/Checkbox"
import { Button } from "@/components/Button/Button"
import { ExternalLink } from 'lucide-react';
import { FormHeading } from "@/components/Form/FormHeading/FormHeading"

//「ご用件」の選択肢
const selects = [
  {
    value: '導入について相談したい',
    name: '導入について相談したい',
  },
  {
    value: '価格について知りたい',
    name: '価格について知りたい',
  },
  {
    value: '製品についての詳細説明を希望',
    name: '製品についての詳細説明を希望',
  },
  {
    value: '見積もりを希望',
    name: '見積もりを希望',
  },
  {
    value: 'その他',
    name: 'その他',
  },
];

//「サービスを知ったきっかけ」の選択肢
const multipleSelections = [
  {
    id: 'webSearch',
    caption: 'ウェブ検索（Google、Bingなど）'
  },
  {
    id: 'sns',
    caption: 'SNS（X、Facebookなど）'
  },
  {
    id: 'seminar',
    caption: '業界関連のセミナーや展示会'
  },
  {
    id: 'newsletter',
    caption: 'メールマガジン・ニュースレター'
  },
  { id:'ad',
    caption: '広告（オンライン広告、リスティング広告、雑誌広告など）'
  },
  {
    id: 'recommendation',
    caption: '口コミ・紹介'
  },
  {
    id: 'media',
    caption: '業界専門誌やメディア記事'
  },
]

const formSchema = z.object({
  username: z.string().min(2, {
    message: "お名前は必須項目です",
  }),
  email: z.string().email({
    message: "メールアドレスは必須項目です",
  }),
  purpose: z.string().min(2, {
    message: "ご用件は必須項目です",
  }),
  description: z.string().min(2, {
    message: "",
  }),
  multipleSelections: z.array(z.string()).min(1, {
    message: "少なくとも1つの項目を選択してください",
  }),
  agreePrivacyPolicy: z.boolean().refine((value) => value === true, {
    message: "プライバシーポリシーへの同意が必須です",
  }),
})

export function ContactForm() {
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: "",
        email: "",
        purpose: "",
        description: "",
        multipleSelections: [],
        agreePrivacyPolicy: false,
      },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
      console.log(values)
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormHeading state="required">お名前</FormHeading>
                <FormControl>
                  <Input aria-required="true" placeholder="田中 太郎" {...field} />
                </FormControl>
                <FormAlert />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormHeading state="required">メールアドレス</FormHeading>
                <FormControl>
                  <Input aria-required="true"  placeholder="example@example.com" {...field} />
                </FormControl>
                <FormAlert />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="purpose"
            render={({ field }) => (
              <FormItem>
                <FormHeading state="required">ご用件</FormHeading>
                <FormControl>
                  <Select
                    aria-required="true"
                    onValueChange={field.onChange}
                    placeholder="選択してください"
                  >
                    <SelectContent>
                      <SelectItem selects={selects} value={field.value}/>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormAlert />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormHeading>ご内容</FormHeading>
                <FormControl>
                  <Textarea placeholder="お問い合わせ内容をご記入ください。例：導入をご検討の背景や、具体的な課題について" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="multipleSelections"
            render={() => (
              <FormItem>
                <FormHeading state="required">サービスを知ったきっかけ</FormHeading>
                {multipleSelections.map((multipleSelection) => (
                  <FormField
                    key={multipleSelection.id}
                    control={form.control}
                    name="multipleSelections"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={multipleSelection.id}
                          className="flex items-start space-x-2 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              aria-required="true"
                              checked={field.value?.includes(multipleSelection.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, multipleSelection.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== multipleSelection.id
                                      )
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel>{multipleSelection.caption}</FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormAlert />
              </FormItem>
            )}
          />

          <div className="text-sm">
            <a
              href="http://"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center font-medium text-blue-500 underline"
              aria-label="プライバシーポリシー（外部リンク）"
            >
              プライバシーポリシー
              <ExternalLink className="size-4 shrink-0"/>
            </a>をお読みいただき、<span className="inline-block">同意いただける場合は次へ進んでください</span>
          </div>

          <FormField
            control={form.control}
            name="agreePrivacyPolicy"
            render={({ field }) => (
              <FormItem>
                <FormHeading state="required">プライバシーポリシー</FormHeading>
                <div className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      aria-required="true"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>同意する</FormLabel>
                </div>
                <FormAlert />
              </FormItem>
            )}
          />

          <div className="mt-10 flex justify-center">
            <Button type="submit">同意の上、入力内容を送信</Button>
          </div>
        </form>
      </Form>
    )
  }
